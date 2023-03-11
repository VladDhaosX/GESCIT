ALTER PROCEDURE SpUserCategories
@UserId INT
AS BEGIN
	
	DECLARE @RolId INT
	SELECT @RolId = RolId FROM Users WHERE Id = @UserId

	SELECT DISTINCT
		mc.Id
		, mc.[Key]
		, mc.Name
		, mc.Description
	FROM ModuleCategories mc 
		LEFT JOIN Modules m ON m.ModuleCategoriesId = mc.Id
		LEFT JOIN ModulePermissions mp ON mp.ModuleId = m.Id
	WHERE mp.RolId = @RolId

END

GO


	EXEC SpUserCategories 1
