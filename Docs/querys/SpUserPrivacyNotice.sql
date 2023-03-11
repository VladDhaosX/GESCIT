
CREATE PROCEDURE SpUserPrivacyNotice
@UserId INT,
@successMessage VARCHAR(MAX) OUTPUT
AS BEGIN

	UPDATE Users SET PrivacyNotice = 1 WHERE Id = @UserId
    SET @successMessage = 'Aviso de Privacidad Aceptado';

END

GO

	SELECT * FROM Users
	UPDATE Users SET PrivacyNotice = 0 WHERE Id = 1
GO
