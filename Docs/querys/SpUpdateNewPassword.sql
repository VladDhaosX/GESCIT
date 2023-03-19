ALTER PROCEDURE SpUpdateNewPassword
@user VARCHAR(MAX),
@email VARCHAR(MAX),
@token VARCHAR(MAX),
@NewPassword VARCHAR(MAX),
@Success VARCHAR(MAX) OUTPUT,
@Message VARCHAR(MAX) OUTPUT
AS BEGIN

	UPDATE Users SET password = @NewPassword WHERE userName = @user AND mail = @email
	UPDATE PasswordRestTokens SET Expired = 1 WHERE userName = @user AND Email = @email AND Token = @token

	SET @Success = 1;
	SET @Message = '“Su contraseña ha sido restablecida correctamente';
	RETURN
	--UPDATE Users SET password = @NewPassword WHERE userName = @user AND mail = @email

END

GO
