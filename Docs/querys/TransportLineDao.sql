ALTER PROCEDURE SpAddOrUpdateTransportLine
	@TransportLineId INT,
	@UserId INT,
	@NameLine VARCHAR(50),
	@TransportLineTypeId INT,
	@StatusId INT
AS
BEGIN

	DECLARE @ClientId INT;
	SELECT @ClientId = ClientId FROM Users WHERE Id = @UserId
	
	IF @TransportLineId IS NULL OR @TransportLineId = 0
	BEGIN
		-- Insertar un nuevo registro
		INSERT INTO TransportLines (ClientId, NameLine, TransportLineTypeId, StatusId)
		VALUES (@ClientId, @NameLine, @TransportLineTypeId, @StatusId)
		SELECT 0 AS Ok
	END
	ELSE
	BEGIN
		-- Actualizar el registro
		UPDATE TransportLines
		SET ClientId = @ClientId,
			NameLine = @NameLine,
			TransportLineTypeId = @TransportLineTypeId,
			StatusId = @StatusId
		WHERE Id = @TransportLineId
		SELECT 1 AS Ok
	END
END

GO


ALTER PROCEDURE SpGetTransportLines
	@TransportLineId INT = NULL,
	@UserId INT
AS
BEGIN
	DECLARE @ClientId INT;
	SELECT @ClientId = ClientId FROM Users WHERE Id = @UserId
	
	IF @TransportLineId IS NOT NULL AND @TransportLineId <> 0
	BEGIN
		-- Buscar un registro específico
		SELECT ISNULL(Id, 0) AS Id, ISNULL(ClientId, 0) AS ClientId, ISNULL(NameLine, '') AS NameLine, ISNULL(TransportLineTypeId, 0) AS TransportLineTypeId, ISNULL(StatusId, 0) AS StatusId
		FROM TransportLines
		WHERE Id = @TransportLineId
	END
	ELSE
	BEGIN
		-- Regresar todos los registros
		SELECT ISNULL(Id, 0) AS Id, ISNULL(ClientId, 0) AS ClientId, ISNULL(NameLine, '') AS NameLine, ISNULL(TransportLineTypeId, 0) AS TransportLineTypeId, ISNULL(StatusId, 0) AS StatusId
		FROM TransportLines 
		WHERE ClientId = @ClientId
	END
END

GO
