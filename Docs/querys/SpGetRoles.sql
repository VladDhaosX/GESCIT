CREATE PROCEDURE SpGetRoles
AS BEGIN

	SELECT 
		ISNULL(Id,0) AS Id,
		ISNULL(Name,'') AS Rol
	FROM Roles

END