--#inserir#

BEGIN TRY
    BEGIN TRAN 

        INSERT INTO 
            Venda
        OUTPUT inserted.VendaId
        values 
        (   
            @cliente
            ,GETDATE()
        )
                
    COMMIT TRAN
        
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '0' as retorno               
END CATCH

--END#inserir#

--#inserirProdutoVenda#

BEGIN TRY
    BEGIN TRAN 

        INSERT INTO 
            ProdutoVenda
        values 
        (   
            @produtoId
            ,@vendaId
            ,@quantidade
        )
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Venda finalizada com sucesso!" , "class" : "success" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Venda não realizada!\n motivo:'+ ERROR_MESSAGE() +'" , "class" : "error" }' as retorno               
END CATCH

--END#inserirProdutoVenda#

--#historico#

SELECT                 
    v.VendaId
    ,v.Cliente
    ,v.DataCadastro
    ,prod.Total
FROM 
    Venda v
INNER JOIN 
    (
        SELECT 
            pv.VendaId
            ,SUM(p.ValorUnitario * pv.Quantidade) as Total
        FROM
            Produto p 
            INNER JOIN ProdutoVenda pv ON pv.ProdutoId = p.ProdutoId
        GROUP BY
            pv.VendaId
    ) as prod ON prod.VendaId = v.VendaId
WHERE
    v.Cliente like @cliente
    AND (CAST(v.DataCadastro AS DATE) BETWEEN CAST(@dataInicio AS DATE) AND CAST(@dataFim AS DATE))

--END#historico#

--#detalhesVenda#

SELECT
    p.Descricao	[Produto]
    ,c.Descricao [Categoria]
    ,pv.Quantidade
    ,p.ValorUnitario
    ,(p.ValorUnitario * pv.Quantidade) [SubTotal]
FROM
    Produto p
INNER JOIN
    ProdutoVenda pv ON pv.ProdutoId = p.ProdutoId
        AND pv.VendaId = @vendaId
INNER JOIN
    Categoria c ON c.CategoriaId = p.CategoriaId

--END#detalhesVenda#