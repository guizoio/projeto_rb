
--#inserir#
BEGIN TRY
    BEGIN TRAN 

        INSERT INTO 
            projeto_l..uu01 (login, senha, nick, nome, email, apagado, controle, datacad, dataalt)
        values 
        (
            @login
            ,@senha
            ,@nick
            ,@nome
            ,@email
            ,0
            ,0
            ,getdate()
			,getdate()
        )
                
    COMMIT TRAN
        SELECT '{ "resultado" : "sucesso", "msg" : "Cadastro realizado com sucesso!" , "class" : "success" }' as retorno
END TRY
BEGIN CATCH                    
    ROLLBACK TRAN   
        SELECT '{ "resultado" : "erro", "msg" : "Cadastro não realizado!\n motivo:'+ ERROR_MESSAGE() +'" , "class" : "error" }' as retorno               
END CATCH
--END#inserir#