ALTER PROCEDURE SpGetLineDocuments
@TransportLineId INT,
@TemporalDocumentId INT
AS BEGIN

	IF @TransportLineId IS NULL OR @TransportLineId = 0
	BEGIN
		
		SELECT 
			f.Id,
			FORMAT(f.CreateDate,'dd-MM-yyyy') AS Fecha,
			d.Name AS 'Tipo de Documento',
			f.OriginalName AS 'Nombre'
		FROM DocumentFiles f
		LEFT JOIN Documents d ON d.Id = f.DocumentId
		WHERE TemporalDocumentId = @TemporalDocumentId

	END ELSE BEGIN
	
		SELECT 
			f.Id,
			FORMAT(f.CreateDate,'dd-MM-yyyy') AS Fecha,
			d.Name AS 'Tipo de Documento',
			f.OriginalName AS 'Nombre'
		FROM DocumentFiles f
		LEFT JOIN Documents d ON d.Id = f.DocumentId
		WHERE d.DocumentTypeId = 1 AND f.ModuleId = @TransportLineId
	END

END


