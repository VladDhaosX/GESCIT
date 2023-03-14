ALTER PROCEDURE SpAddOrUpdateTransport
@TransportId INT,
@UserId INT,
@TransportTypeId INT,
@TransportPlate1 VARCHAR(10),
@TransportPlate2 VARCHAR(10),
@TransportPlate3 VARCHAR(10),
@Capacity INT,
@StatusId INT,
@Success BIT OUTPUT,
@Message VARCHAR(50) OUTPUT
AS
BEGIN
	BEGIN TRY
	
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
		SET @Message = 'Registro realizado con exito.'
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
		SET @Message = 'Registro actualizado correctamente.'
		END

		SET @Success = 1
	END TRY
	BEGIN CATCH
		SET @Success = 0
		SET @Message = 'Error: ' + ERROR_MESSAGE()
	END CATCH
END

GO

SELECT * FROM Transports

TRUNCATE TABLE Transports