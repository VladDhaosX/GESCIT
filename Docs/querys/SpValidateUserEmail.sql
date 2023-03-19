ALTER PROCEDURE SpValidateUserEmail
@User VARCHAR(MAX),
@Mail VARCHAR(MAX),
@MailExists BIT OUTPUT 
AS BEGIN

	IF EXISTS(SELECT 1 FROM Users WHERE mail = @Mail AND userName = @User) SET @MailExists = 1 ELSE SET @MailExists = 0
END
GO

SELECT * FROM Users

