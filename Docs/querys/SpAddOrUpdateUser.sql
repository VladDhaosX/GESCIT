ALTER PROCEDURE SpAddOrUpdateUser
@AccountNum VARCHAR(50),
@name VARCHAR(50),
@mail VARCHAR(50),
@userName VARCHAR(50),
@userTypeId INT,
@password VARCHAR(50),
@success BIT OUTPUT,
@Id INT OUTPUT,
@PrivacyNotice INT OUTPUT,
@successMessage VARCHAR(100) OUTPUT,
@errorMessage VARCHAR(100) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @RolId INT;
	IF @userTypeId = 1 
	BEGIN 
		SET @RolId = 1 
		SET @PrivacyNotice = 1
		SET @successMessage = 'Registro exitoso.';
	END
	ELSE IF  @userTypeId = 2 BEGIN
		SET @RolId = 4;
		SET @PrivacyNotice = 0;	
		SET @successMessage = 'Es necesario aceptar el aviso de privacidad.';
	END
	BEGIN TRY
		IF EXISTS(SELECT 1 FROM Users WHERE userName = @userName AND password = @password)
		BEGIN
			UPDATE Users SET
			AccountNum = @AccountNum,
			name = @name,
			mail = @mail,
			userName = @userName,
			userTypeId = @userTypeId,
			password = @password,
			RolId = @RolId
			WHERE userName = @userName AND password = @password;
			
			SET @success = 1;
			SET @Id = (SELECT Id FROM Users WHERE userName = @userName AND password = @password);
			SET @PrivacyNotice = (SELECT PrivacyNotice FROM Users WHERE Id = @Id);
			SET @PrivacyNotice = ISNULL(@PrivacyNotice,0);
			IF @PrivacyNotice = 0
			BEGIN
				SET @successMessage = 'Es necesario aceptar el aviso de privacidad.';
			END ELSE BEGIN
				SET @successMessage = 'Login correcto.';
			END
		END
		ELSE
		BEGIN
			INSERT INTO Users (AccountNum, name, mail, userName, userTypeId, password, RolId,PrivacyNotice)
			VALUES (@AccountNum, @name, @mail, @userName, @userTypeId, @password,@RolId,@PrivacyNotice);
	  
			SET @Id = SCOPE_IDENTITY();
			SET @success = 1;
		END
	END TRY
	BEGIN CATCH
		SET @errorMessage = 'Error al intentar actualizar o insertar el registro.';
		SET @success = 0;
	END CATCH
END



