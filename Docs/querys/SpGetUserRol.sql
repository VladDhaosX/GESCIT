
CREATE PROCEDURE SpGetUserRol
AS BEGIN

	SELECT 
		ISNULL(u.Id, '') AS 'UserId'
		, ISNULL(u.name, '') AS 'Nombre'
		, ISNULL(u.userName, '') AS 'Usuario' 
		, ISNULL(r.Id, '') AS 'RolId'
		, ISNULL(r.Name, '') AS 'Rol'
	FROM Users u
	LEFT JOIN Roles r ON r.Id = u.RolId

END

GO

EXEC SpGetUserRol
