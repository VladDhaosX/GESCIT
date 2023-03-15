ALTER PROCEDURE SpUserModules
@UserId INT
AS BEGIN
	
	DECLARE @RolId INT
	SELECT @RolId = RolId FROM Users WHERE Id = @UserId

	SELECT
		ISNULL(m.Id, 0) AS Id
	, ISNULL(m.ModuleCategoriesId, 0) AS ModuleCategoriesId
	, ISNULL(m.[Key], '') AS [Key]
	, ISNULL(m.Name, '') AS Name
	, ISNULL(m.Description, '') AS Description
	, ISNULL(m.Icon, '') AS Icon
	FROM Modules m 
		LEFT JOIN RolesPermissions rp ON rp.ModuleId = m.Id
	WHERE rp.RolId = @RolId

END


GO
