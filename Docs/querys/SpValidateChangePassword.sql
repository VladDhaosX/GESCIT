ALTER PROCEDURE SpValidateChangePassword
@user VARCHAR(MAX),
@email VARCHAR(MAX),
@token VARCHAR(MAX),
@NewPassword VARCHAR(MAX),
@ConfirmedNewPassword VARCHAR(MAX),
@OldPassword VARCHAR(MAX) OUTPUT,
@Success VARCHAR(MAX) OUTPUT,
@Message VARCHAR(MAX) OUTPUT
AS BEGIN
	DECLARE @Expired BIT, @CreatedDate DATETIME;
	
	IF NOT EXISTS(SELECT 1 FROM PasswordRestTokens WHERE userName = @user AND Email = @email AND Token = @token)
	BEGIN
		SET @Message = 'Hubo un problema con la solicitud, comunicate con un administrador.'
		SET @Success = 0;
		RETURN
	END

	SELECT @Expired = Expired, @CreatedDate = CreatedDate FROM PasswordRestTokens WHERE userName = @user AND Email = @email AND Token = @token

	IF @Expired = 1 
	BEGIN
		SET @Message = 'Su link ya fue utilizado o ha expirado, de ser necesario, solicite un nuevo cambio de contraseña.'
		SET @Success = 0;
		RETURN
	END

	IF @NewPassword != @ConfirmedNewPassword
	BEGIN
		SET @Message = 'Las contraseñas no coinciden.'
		SET @Success = 0;
		RETURN
	END
		SET @OldPassword = (SELECT [password] FROM Users WHERE userName = @user AND mail = @email)
		SET @Success = 1;
		RETURN
	--UPDATE Users SET password = @NewPassword WHERE userName = @user AND mail = @email

END

GO
