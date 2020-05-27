--#consultar#

SELECT                 
    p.ProdutoId 
    ,p.Descricao
    ,p.ValorUnitario
    ,c.Descricao [Categoria]
    ,CASE
        WHEN p.Ativo = 1 THEN '<span class="badge badge-success">Sim</span>'
        WHEN p.Ativo = 0 THEN '<span class="badge badge-danger">Não</span>'
    END [Ativo]
FROM 
    Produto p
INNER JOIN 
    Categoria c ON c.CategoriaId = p.CategoriaId

--END#consultar#

--#consultarAtivos#

SELECT                 
    p.ProdutoId 
    ,p.Descricao
    ,p.ValorUnitario
    ,c.Descricao [Categoria]
FROM 
    Produto p
INNER JOIN 
    Categoria c ON c.CategoriaId = p.CategoriaId
WHERE
    p.Ativo = 1

--END#consultarAtivos#

--#obterPorId#

SELECT
    ProdutoId
    ,CategoriaId
    ,Descricao
    ,ValorUnitario
FROM 
    Produto
WHERE
    ProdutoId = @produtoId

--END#obterPorId#

--#inserir#

BEGIN TRY
    BEGIN TRAN 

        INSERT INTO 
            Produto
        values 
        (   
            @categoriaId
            ,@descricao
            ,@valorUnitario
            ,@ativo
        )
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Cadastro realizado com sucesso!" , "class" : "success" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Cadastro não realizado!\n motivo:'+ ERROR_MESSAGE() +'" , "class" : "error" }' as retorno               
END CATCH

--END#inserir#

--#atualizar#

BEGIN TRY
    BEGIN TRAN 

        UPDATE 
            Produto
        SET 
            CategoriaId = @categoriaId
            ,Descricao = @descricao
            ,ValorUnitario = @valorUnitario
        WHERE
            ProdutoId = @produtoId
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Cadastro atualizado com sucesso!" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Cadastro não atualizado!\n motivo:'+ ERROR_MESSAGE() +'" }' as retorno               
END CATCH

--END#atualizar#

--#atualizarStatus#

BEGIN TRY
    BEGIN TRAN 

        UPDATE 
            Produto
        SET 
            Ativo = @ativo
        WHERE
            ProdutoId = @produtoId
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Status atualizado com sucesso!" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Status não atualizado!\n motivo:'+ ERROR_MESSAGE() +'" }' as retorno               
END CATCH

--END#atualizarStatus#