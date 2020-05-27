/*
(select cast( @usuario+
			(select right('00' + rtrim(cast(DATEPART(DAY,getdate())as varchar)),2))+
			(select right('00' + rtrim(cast(DATEPART(MONTH,getdate())as varchar)),2))+
			(select cast(DATEPART(YEAR,getdate())as varchar))+'C'+ 
			right('00000' + rtrim((select cast((count(qtd)+1) as varchar) 
			from (select count(obs) as [qtd] from carga where Usuario=@usuario group by obs) tbl)),5)as varchar))
*/
--#vaiConsultarObs#
	declare  @usuario varchar(max)
	set @usuario=@usuari
	select cast
		( 
			@usuario+
			(select right('00' + rtrim(cast(DATEPART(DAY,getdate())as varchar)),2))+
			(select right('00' + rtrim(cast(DATEPART(MONTH,getdate())as varchar)),2))+
			(select cast(DATEPART(YEAR,getdate())as varchar))+'C'+ 
			right('00000' + 
			rtrim((select cast((count(qtd)+1) as varchar) 
					from (select 
                            count(obs) as [qtd] 
                          from 
                            carga 
                          where 
                             Usuario=@usuario and 
                             datepart(year,datac)=datepart(year, getdate()) AND
                             datepart(month,datac)=datepart(month, getdate()) AND
                             datepart(day,datac)=datepart(day, getdate()) 
                           group by obs
                        ) 
					tbl)),5)as varchar(max)
		) as [NomeObs]
--END#vaiConsultarObs#


--#inserir#
BEGIN TRY
    BEGIN TRAN 

        INSERT INTO 
            carga (tipo_captura, tipo_ficha, tipo_parte, tipo_incidente,pasta,usuario,obs,status,DATAC,apagado)
        values 
        (
            @tipo_captura
            ,@tipo_ficha
            ,@tipo_parte
            ,@tipo_incidente
            ,right(replicate('0',6) + @pasta,6)
            ,@usuario
            ,@obs
            ,@status
			,getdate()
			,0
        )
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Cadastro realizado com sucesso!" , "class" : "success" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Cadastro não realizado!\n motivo:'+ ERROR_MESSAGE() +'" , "class" : "error" }' as retorno               
END CATCH
--END#inserir#

--#consultar#
select 
    tbl.[TIPO CONSULTA]
    ,tbl.[FICHA?]
    ,tbl.[PARTE?]
    ,tbl.[INCIDENTE?]
    ,tbl.QTD
    ,tbl.OBS
    ,tbl.[DATA CADASTRO]
    ,ISNULL((select count(c.id) from carga c inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6) where cc.[status]=1 and c.obs=tbl.OBS GROUP by c.obs),0) as [CONCLUIDO]
    ,ISNULL(ROUND((((select count(c.id) from carga c inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6) where cc.[status]=1 and c.obs=tbl.OBS GROUP by c.obs)*100)/(tbl.QTD)),2),0) as [PORCENTO]
from (
select 
	case
		tipo_captura
			when 1 then 'Processual'
			when 2 then 'Palavra Chave'
		else ''
	end									[TIPO CONSULTA] 
	,case
		tipo_ficha
			when 1 then 'Sim'
			when 0 then 'Não'
		else ''
	end									[FICHA?]
	,case
		tipo_parte
			when 1 then 'Sim'
			when 0 then 'Não'
		else ''
	end									[PARTE?]
	,case
		tipo_incidente
			when 1 then 'Sim'
			when 0 then 'Não'
		else ''
	end									[INCIDENTE?]
	,count(id)							[QTD]
	,obs								[OBS]
	,convert(varchar,datac,103)			[DATA CADASTRO]
from
	carga
where
	apagado=0 and usuario=@usuarii
group by
	obs,tipo_captura,tipo_ficha,tipo_parte,tipo_incidente,convert(varchar,datac,103)
)tbl
--END#consultar#


--#consulCarga#
select 
    cc.pasta        [PASTA]
    ,cc.processo    [PROCESSO]
    ,cc.UF          [UF]
    ,CASE
        WHEN cc.[status]=1 THEN 'CONCLUIDO'
        WHEN CC.[status]=3 THEN 'PENDENTE'
        WHEN CC.[status]=10 THEN 'PENDENTE'
        WHEN CC.[status]=2 THEN 'PROCESSANDO'
        ELSE 'ERRO'
    END             [STATUS]
    ,p.assunto                  [ASSUNTO]
    ,p.classe                   [CLASSE]
    ,p.comarca_processo         [COMARCA]
    ,p.competencia              [COMPETENCIA]
    ,p.controle                 [CONTROLE]
    ,p.distribuicao             [DISTRIBUICAO]
    ,p.valor_da_causa           [VALOR]
    ,c.obs                      [OBS]
from 
    carga c
    left join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
    left join tbldadosprocessuais p on p.processo=cc.processo
where 
    c.obs=@obsConsul
--END#consulCarga#


--#consultaPORcentagem#
select 
    count(c.id) as [TOTAL]
    ,(select count(c.id) from carga c inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6) where cc.[status]=1 and c.obs=@obsConsul GROUP by c.obs) as [CONCLUIDO]
    ,ROUND((((select count(c.id) from carga c inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6) where cc.[status]=1 and c.obs=@obsConsul GROUP by c.obs)*100)/(count(c.id))),2) as [PORCENTO]
from 
    carga c
    left join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
where 
    c.obs=@obsConsul
GROUP by c.obs
--END#consultaPORcentagem#


--#consulta4MOVIMENTACOES#
select 
    cc.pasta        [PASTA]
    ,cc.processo    [PROCESSO]
    ,mov1.data      [DATA ULTIMO ANDAMENTO]
    ,mov1.texto     [TEXTO ULTIMO ANDAMENTO]
    ,mov2.data      [DATA PENULTIMO ANDAMENTO]
    ,mov2.texto     [TEXTO PENULTIMO ANDAMENTO]
    ,mov3.data      [DATA ANTEPENULTIMO ANDAMENTO]
    ,mov3.texto     [TEXTO ANTEPENULTIMO ANDAMENTO]
    ,mov4.data      [DATA ANTES DO ANTEPENULTIMO ANDAMENTO]
    ,mov4.texto     [TEXTO ANTES DO ANTEPENULTIMO ANDAMENTO]
from 
    carga c
    left join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
    left join(
        select 
            m.processo
            ,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),'  ','') as [data]
            ,m.texto
            ,rank()over(partition by m.processo
            order by convert(date,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),' ',''),103) desc, m.id desc)as rankd 
        from 
            carga c
            inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
                 and c.obs=@obsConsul
            inner join tblmovimentacao m on m.processo=cc.processo
    )mov1 on mov1.processo=cc.processo
        and mov1.rankd=1
    left join(
        select 
            m.processo
            ,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),'  ','') as [data]
            ,m.texto
            ,rank()over(partition by m.processo
            order by convert(date,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),' ',''),103) desc, m.id desc)as rankd
        from 
            carga c
            inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
                 and c.obs=@obsConsul
            inner join tblmovimentacao m on m.processo=cc.processo
    )mov2 on mov2.processo=cc.processo
        and mov2.rankd=2
    left join(
        select 
            m.processo
            ,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),'  ','') as [data]
            ,m.texto
            ,rank()over(partition by m.processo
            order by convert(date,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),' ',''),103) desc, m.id desc)as rankd 
        from 
            carga c
            inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
                 and c.obs=@obsConsul
            inner join tblmovimentacao m on m.processo=cc.processo
    )mov3 on mov3.processo=cc.processo
        and mov3.rankd=3
    left join(
        select 
            m.processo
            ,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),'  ','') as [data]
            ,m.texto
            ,rank()over(partition by m.processo
            order by convert(date,replace(REPLACE(REPLACE(m.data,CHAR(13) + Char(10) ,' '), CHAR(10), ''),' ',''),103) desc, m.id desc)as rankd 
        from 
            carga c
            inner join tblcarga cc on cc.pasta=right(replicate('0',6) + c.pasta,6)
                 and c.obs=@obsConsul
            inner join tblmovimentacao m on m.processo=cc.processo
    )mov4 on mov4.processo=cc.processo
        and mov4.rankd=4
where 
    c.obs=@obsConsul
--END#consulta4MOVIMENTACOES#