CREATE PROCEDURE SpGetTransportType
AS BEGIN

	SELECT 
		Id,
		ISNULL(Type,'') AS Type
	FROM TransportType

END