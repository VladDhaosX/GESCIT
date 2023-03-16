ALTER PROCEDURE SpGetTransportLines
	@UserId INT
AS
BEGIN
	DECLARE @AccountNum INT;
	SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId
	
	SELECT 
		ISNULL(Id, 0) AS Id, 
		ISNULL(AccountNum, 0) AS AccountNum, 
		ISNULL(Name, '') AS Name, 
		ISNULL(LineTypeId, 0) AS LineTypeId, 
		ISNULL(StatusId, 0) AS StatusId
	FROM TransportLines 
	WHERE AccountNum = @AccountNum

END
