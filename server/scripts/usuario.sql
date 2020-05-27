--#consultar#

SELECT                 
    UsuarioId
    ,Nome
    ,UsuarioAcesso
    ,Email
FROM 
    Usuario

--END#consultar#

--#obterPorId#

SELECT                 
    UsuarioId
    ,Nome
    ,UsuarioAcesso
    ,Email
FROM 
    Usuario
WHERE
    UsuarioId = @usuarioId

--END#obterPorId#

--#inserir#

BEGIN TRY
    BEGIN TRAN 

        INSERT INTO 
            Usuario
        values 
        (
            @nome
            ,@usuario
            ,@senha
            ,@email
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
            Usuario
        SET 
            Nome = @nome
            , UsuarioAcesso = @usuario
            , Email = @email
        WHERE
            UsuarioId = @usuarioId
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Cadastro atualizado com sucesso!" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Cadastro não atualizado!\n motivo:'+ ERROR_MESSAGE() +'" }' as retorno               
END CATCH 

--END#atualizar#

--#remover#

BEGIN TRY
    BEGIN TRAN 

        DELETE FROM 
            Usuario
        WHERE
            UsuarioId = @usuarioId
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Registro removido com sucesso!" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Falha ao remover registro!\n motivo:'+ ERROR_MESSAGE() +'" }' as retorno               
END CATCH

--END#remover#