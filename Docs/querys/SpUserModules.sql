ALTER PROCEDURE SpUserModules
@UserId INT
AS BEGIN
	
	DECLARE @RolId INT
	SELECT @RolId = RolId FROM Users WHERE Id = @UserId

	SELECT
		m.Id
		, m.ModuleCategoriesId
		, m.[Key]
		, m.Name
		, m.Description
	FROM Modules m 
		LEFT JOIN ModulePermissions mp ON mp.ModuleId = m.Id
	WHERE mp.RolId = @RolId

END

GO

EXEC SpUserModules 1