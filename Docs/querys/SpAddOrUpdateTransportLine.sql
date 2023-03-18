ALTER PROCEDURE SpAddOrUpdateTransportLine
@TransportLineId INT OUTPUT,
@TemporalDocumentId INT OUTPUT,
@UserId INT,
@Name VARCHAR(50),
@LineTypeId INT,
@Success BIT OUTPUT,
@Message VARCHAR(100) OUTPUT
AS
BEGIN
	BEGIN TRY
		DECLARE @AccountNum VARCHAR(MAX);
		SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId

		IF @Name IS NULL OR @Name = ''
		BEGIN
			SET @Success = 0
			SET @Message = 'Es necesario asignar un nombre.'
			RETURN
		END

		IF @LineTypeId IS NULL OR @LineTypeId = 0
		BEGIN
			SET @Success = 0
			SET @Message = 'Es necesario asignar el tipo de linea.'
			RETURN
		END

		IF @TransportLineId IS NULL OR @TransportLineId = 0
		BEGIN

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 1 AND TemporalDocumentId = @TemporalDocumentId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Acta Constitutiva.'
				RETURN
			END

			-- Insertar un nuevo registro
			INSERT INTO TransportLines (AccountNum, Name, LineTypeId, StatusId)
			VALUES (@AccountNum, @Name, @LineTypeId, 1)

			SET @TransportLineId = SCOPE_IDENTITY();

			UPDATE DocumentFiles SET ModuleId = @TransportLineId, TemporalDocumentId = NULL WHERE TemporalDocumentId = @TemporalDocumentId
			SET @TemporalDocumentId = NULL;

			SET @Success = 1
			SET @Message = 'Se inserto el registro.'
			RETURN
		END
		ELSE
		BEGIN

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 1 AND ModuleId = @TransportLineId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Acta Constitutiva.'
				RETURN
			END

			-- Actualizar el registro
			UPDATE TransportLines
			SET AccountNum = @AccountNum,
				Name = @Name,
				LineTypeId = @LineTypeId
			WHERE Id = @TransportLineId
			SET @Success = 1
			SET @Message = 'Se actualizo el registro.'
		RETURN
		END
	END TRY
	BEGIN CATCH
		SET @Success = 0
		SET @Message = 'Error: ' + ERROR_MESSAGE()
	END CATCH
END

