ALTER PROCEDURE SpValidateUser
@userName VARCHAR(50),
@password VARCHAR(50),
@success BIT OUTPUT,
@Id INT OUTPUT,
@PrivacyNotice INT OUTPUT,
@successMessage VARCHAR(100) OUTPUT,
@errorMessage VARCHAR(100) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		IF EXISTS(SELECT 1 FROM Users WHERE userName = @userName AND password = @password)
		BEGIN
			SELECT 
				@Id = Id, 
				@success = 1, 
				@PrivacyNotice = PrivacyNotice, 
				@successMessage = 'Usuario registrado.' 
				FROM Users 
				WHERE userName = @userName AND password = @password
		END
	END TRY
	BEGIN CATCH
		SET @errorMessage = 'Error al intentar actualizar o insertar el registro.';
		SET @success = 0;
	END CATCH
END
