ALTER PROCEDURE SpAddOrUpdateTransportLine
@TransportLineId INT,
@UserId INT,
@NameLine VARCHAR(50),
@TransportLineTypeId INT,
@StatusId INT,
@Success BIT OUTPUT,
@Message VARCHAR(50) OUTPUT
AS
BEGIN
	BEGIN TRY
		DECLARE @ClientId INT;
		SELECT @ClientId = ClientId FROM Users WHERE Id = @UserId
			IF @TransportLineId IS NULL OR @TransportLineId = 0
			BEGIN
				-- Insertar un nuevo registro
				INSERT INTO TransportLines (ClientId, NameLine, TransportLineTypeId, StatusId)
				VALUES (@ClientId, @NameLine, @TransportLineTypeId, @StatusId)
		
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
			SET @Success = 1
			SET @Message = 'Success'
	END TRY
	BEGIN CATCH
		SET @Success = 0
		SET @Message = 'Error: ' + ERROR_MESSAGE()
	END CATCH
END

GO