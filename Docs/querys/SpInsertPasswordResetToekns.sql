ALTER PROCEDURE SpInsertPasswordResetToekns
    @user VARCHAR(MAX),
    @email VARCHAR(MAX),
    @token VARCHAR(255),
	@Success BIT OUTPUT,
	@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	DECLARE @UserId INT;
	SELECT @UserId = Id FROM Users WHERE userName = @user AND mail = @email;

    INSERT INTO PasswordRestTokens (UserId, userName, Email, Token, Expired, CreatedDate)
    VALUES (@userId,@user, @email, @token, 0, GETDATE());
	SET @Success = 1;
	SET @Message = 'Se inserto el registro';
END

GO

