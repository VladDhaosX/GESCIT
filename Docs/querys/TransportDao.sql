
ALTER PROCEDURE SpAddOrUpdateTransport
    @TransportId INT,
	@UserId INT,
    @TransportTypeId INT,
    @TransportPlate1 VARCHAR(10),
    @TransportPlate2 VARCHAR(10),
    @TransportPlate3 VARCHAR(10),
    @Capacity INT,
    @StatusId INT
AS
BEGIN
	
	DECLARE @ClientId INT;
	SELECT @ClientId = ClientId FROM Users WHERE Id = @UserId

    IF @TransportId IS NULL OR @TransportId = 0
    BEGIN
        -- Insertar nuevo registro
        INSERT INTO Transports (
            ClientId,
            TransportTypeId,
            TransportPlate1,
            TransportPlate2,
            TransportPlate3,
            Capacity,
            StatusId
        )
        VALUES (
            @ClientId,
            @TransportTypeId,
            @TransportPlate1,
            @TransportPlate2,
            @TransportPlate3,
            @Capacity,
            @StatusId
        )
    END
    ELSE
    BEGIN
        -- Actualizar registro existente
        UPDATE Transports
        SET
            ClientId = @ClientId,
            TransportTypeId = @TransportTypeId,
            TransportPlate1 = @TransportPlate1,
            TransportPlate2 = @TransportPlate2,
            TransportPlate3 = @TransportPlate3,
            Capacity = @Capacity,
            StatusId = @StatusId
        WHERE Id = @TransportId
    END
END

GO

--Stored Procedure para consultar la tabla Transports y reemplazar valores NULL por una cadena vacía
ALTER PROCEDURE SpGetTransports
  @TransportId INT,
  @UserId INT
AS
BEGIN

	DECLARE @ClientId INT;
	SELECT @ClientId = ClientId FROM Users WHERE Id = @UserId;

  IF @TransportId IS NULL OR @TransportId = 0
    SELECT 
      Id,
      ClientId,
      TransportTypeId,
      ISNULL(TransportPlate1, '') as TransportPlate1,
      ISNULL(TransportPlate2, '') as TransportPlate2,
      ISNULL(TransportPlate3, '') as TransportPlate3,
      Capacity,
      StatusId
    FROM Transports WHERE ClientId = @ClientId;
  ELSE
    SELECT 
      Id,
      ClientId,
      TransportTypeId,
      ISNULL(TransportPlate1, '') as TransportPlate1,
      ISNULL(TransportPlate2, '') as TransportPlate2,
      ISNULL(TransportPlate3, '') as LicensePlate3,
      Capacity,
      StatusId
    FROM Transports
    WHERE Id = @TransportId;
END;
GO

EXEC SpGetTransports 0,1

SELECT * FROM Transports

GO

SELECT * FROM TransportType