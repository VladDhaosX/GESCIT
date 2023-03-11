ALTER PROCEDURE SpUserRol
@UserId INT
AS BEGIN
	
	DECLARE @RolId INT
	SELECT @RolId = RolId FROM Users WHERE Id = @UserId

	SELECT
		r.Id
		, r.[Key]
		, r.Name
		, r.Description
	FROM Roles r
	WHERE r.Id = @RolId

END

GO

EXEC SpUserRol 1