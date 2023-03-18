CREATE PROCEDURE SpDeleteDocumentById
@DocumentFileId INT,
@Success BIT OUTPUT,
@Message VARCHAR(100) OUTPUT
AS BEGIN

	DELETE FROM DocumentFiles WHERE Id = @DocumentFileId
	SET @Success = 1
	SET @Message = 'Se ha eliminado el archivo.'

END