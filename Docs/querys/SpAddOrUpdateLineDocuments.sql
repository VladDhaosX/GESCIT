ALTER PROCEDURE SpAddOrUpdateLineDocuments
	@UserId INT,
	@TemporalDocumentId INT OUTPUT,
	@DocumentId INT,
	@ModuleId INT,
	@FieldName VARCHAR(255),
	@OriginalName VARCHAR(255),
	@Mimetype VARCHAR(255),
	@FileData VARBINARY(MAX),
	@Size INT,
	@Success BIT OUTPUT,
	@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	DECLARE @DocumentFileId INT 

	-- Initialize success and message output parameters
	SET @Success = 0
	SET @Message = ''

	IF @DocumentId IS NULL OR @DocumentId = 0
	BEGIN
		SET @Message = 'Es necesario asignar el tipo de documento.'
		SET @Success = 0
		RETURN
	END

	IF @ModuleId IS NULL OR @ModuleId = 0
	BEGIN
		-- Insert document file without module id
		INSERT INTO DocumentFiles (UserId, TemporalDocumentId, DocumentId, FieldName, OriginalName, Mimetype, FileData, Size)
		VALUES (@UserId, @TemporalDocumentId, @DocumentId, @FieldName, @OriginalName, @Mimetype, @FileData, @Size)
		SET @DocumentFileId = SCOPE_IDENTITY();

		IF @TemporalDocumentId IS NULL OR @TemporalDocumentId = 0
		BEGIN
			-- Create new temporal document for the document file
			INSERT INTO TemporalDocuments (DocumentFileId) VALUES (@DocumentFileId)
			SET @TemporalDocumentId = SCOPE_IDENTITY()

			-- Update the temporal document id of the document file
			UPDATE DocumentFiles SET TemporalDocumentId = @TemporalDocumentId WHERE Id = @DocumentFileId
		END
		
		SET @Message = 'Se ha guardado el archivo correctamente'
		SET @Success = 1

		RETURN
	END 
	-- Insert document file with module id
	INSERT INTO DocumentFiles (UserId, ModuleId, DocumentId, FieldName, OriginalName, Mimetype, FileData, Size)
	VALUES (@UserId, @ModuleId, @DocumentId, @FieldName, @OriginalName, @Mimetype, @FileData, @Size)

	-- Set success output parameter to true
	SET @Success = 1
	SET @Message = 'Se ha guardado el archivo correctamente'
	SET @TemporalDocumentId = NULL

	RETURN
END
