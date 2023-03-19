ALTER PROCEDURE SpUserPrivacyNotice
@UserId INT,
@success BIT OUTPUT
AS BEGIN

	UPDATE Users SET PrivacyNotice = 1 WHERE Id = @UserId
    SET @success = 1;
	RETURN
END


GO

