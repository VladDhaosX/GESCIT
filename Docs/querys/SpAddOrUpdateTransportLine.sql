ALTER PROCEDURE SpAddOrUpdateTransportLine
@TransportLineId INT,
@UserId INT,
@Name VARCHAR(50),
@LineTypeId INT,
@Success BIT OUTPUT,
@Message VARCHAR(50) OUTPUT
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
			-- Insertar un nuevo registro
			INSERT INTO TransportLines (AccountNum, Name, LineTypeId, StatusId)
			VALUES (@AccountNum, @Name, @LineTypeId, 1)

			SET @Success = 1
			SET @Message = 'Se inserto el registro.'
			RETURN
		END
		ELSE
		BEGIN
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


GO
