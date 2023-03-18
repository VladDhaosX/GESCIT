

ALTER PROCEDURE SpGetFileById
@DocumentFilId INT
AS BEGIN

	SELECT * FROM DocumentFiles WHERE Id = @DocumentFilId

END

GO
