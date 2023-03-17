CREATE PROCEDURE SpGetTransportLineTypes
AS BEGIN

	SELECT 
		Id,
		ISNULL(Type,'') AS Type
	FROM TransportLineType

END
