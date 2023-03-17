ALTER PROCEDURE SpGetTransportLines
	@UserId INT
AS
BEGIN
	DECLARE @AccountNum INT;
	SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId
	
	SELECT 
		ISNULL(tl.Id, 0) AS Id, 
		ISNULL(tl.Name, '') AS 'Linea de Transporte', 
		ISNULL(tl.LineTypeId, 0) AS LineTypeId,
		[type].Type AS 'Tipo de Linea'
	FROM TransportLines tl
	LEFT JOIN TransportLineType [type] ON [type].Id = tl.LineTypeId
	WHERE tl.AccountNum = @AccountNum

END
