
ALTER PROCEDURE SpAddOrUpdateTransport
    @TransportId INT = NULL,
    @ClientId INT,
    @TransportTypeId INT,
    @LicensePlate1 VARCHAR(10),
    @LicensePlate2 VARCHAR(10),
    @LicensePlate3 VARCHAR(10),
    @Capacity INT,
    @StatusId INT
AS
BEGIN
    IF @TransportId IS NOT NULL
    BEGIN
        -- Actualizar registro existente
        UPDATE Transports
        SET
            ClientId = @ClientId,
            TransportTypeId = @TransportTypeId,
            LicensePlate1 = @LicensePlate1,
            LicensePlate2 = @LicensePlate2,
            LicensePlate3 = @LicensePlate3,
            Capacity = @Capacity,
            StatusId = @StatusId
        WHERE Id = @TransportId
    END
    ELSE
    BEGIN
        -- Insertar nuevo registro
        INSERT INTO Transports (
            ClientId,
            TransportTypeId,
            LicensePlate1,
            LicensePlate2,
            LicensePlate3,
            Capacity,
            StatusId
        )
        VALUES (
            @ClientId,
            @TransportTypeId,
            @LicensePlate1,
            @LicensePlate2,
            @LicensePlate3,
            @Capacity,
            @StatusId
        )
    END
END

GO

--Stored Procedure para consultar la tabla Transports y reemplazar valores NULL por una cadena vacía
CREATE PROCEDURE GetTransports
  @TransportId int = NULL
AS
BEGIN
  IF @TransportId IS NULL
    SELECT 
      Id,
      ClientId,
      TransportTypeId,
      ISNULL(LicensePlate1, '') as LicensePlate1,
      ISNULL(LicensePlate2, '') as LicensePlate2,
      ISNULL(LicensePlate3, '') as LicensePlate3,
      Capacity,
      StatusId
    FROM Transports;
  ELSE
    SELECT 
      Id,
      ClientId,
      TransportTypeId,
      ISNULL(LicensePlate1, '') as LicensePlate1,
      ISNULL(LicensePlate2, '') as LicensePlate2,
      ISNULL(LicensePlate3, '') as LicensePlate3,
      Capacity,
      StatusId
    FROM Transports
    WHERE Id = @TransportId;
END;
GO
