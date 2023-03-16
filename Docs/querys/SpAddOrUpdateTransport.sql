ALTER PROCEDURE SpAddOrUpdateTransport
@TransportId INT,
@UserId INT,
@TransportTypeId INT,
@TransportPlate1 VARCHAR(10),
@TransportPlate2 VARCHAR(10),
@TransportPlate3 VARCHAR(10),
@Capacity INT,
@Success BIT OUTPUT,
@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	BEGIN TRY
	
		DECLARE @AccountNum INT,
				@StatusId INT = 1;

		IF (@TransportTypeId IS NULL OR @TransportTypeId = 0)
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar el tipo de transporte.'
			RETURN
		END

		IF (LEN(LTRIM(RTRIM(@TransportPlate1))) = 0)
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar la placa del transporte.'
			RETURN
		END

		IF ((@TransportTypeId = 2 AND LEN(LTRIM(RTRIM(@TransportPlate2))) = 0) 
			OR (@TransportTypeId = 5 AND LEN(LTRIM(RTRIM(@TransportPlate2))) = 0))
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar la placa de la caja 1.'
			RETURN
		END
		
		IF (@TransportTypeId = 5 AND LEN(LTRIM(RTRIM(@TransportPlate3))) = 0 )
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar la placa de la caja 2.'
			RETURN
		END

		SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId

		IF @TransportId IS NULL OR @TransportId = 0
		BEGIN
			-- Insertar nuevo registro
			INSERT INTO Transports (
				AccountNum,
				TransportTypeId,
				TransportPlate1,
				TransportPlate2,
				TransportPlate3,
				Capacity,
				StatusId
			)
			VALUES (
				@AccountNum,
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
				--ClientId = @ClientId,
				TransportTypeId = @TransportTypeId,
				TransportPlate1 = @TransportPlate1,
				TransportPlate2 = @TransportPlate2,
				TransportPlate3 = @TransportPlate3,
				Capacity = @Capacity
				--StatusId = @StatusId
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
