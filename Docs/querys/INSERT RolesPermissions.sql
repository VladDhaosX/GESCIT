SELECT * FROM Roles

SELECT * FROM Modules

SELECT * FROM RolesPermissions

--INSERT INTO RolesPermissions
--SELECT r.Id,m.Id FROM Roles r, Modules m WHERE r.Id = 2 AND m.Id IN (1)


--INSERT INTO RolesPermissions
--SELECT r.Id,m.Id FROM Roles r, Modules m WHERE r.Id = 1 AND m.Id IN (1)


--INSERT INTO RolesPermissions
--SELECT r.Id,m.Id FROM Roles r, Modules m WHERE r.Id = 5 AND m.Id IN (1,5,6,7,8,9)

--DELETE FROM RolesPermissions WHERE RolId = 5

--UPDATE Modules SET Icon = 'bx-home-circle' WHERE Id = 1
--UPDATE Modules SET Icon = 'bxs-business' WHERE Id = 7
--UPDATE Modules SET Icon = 'bxs-truck' WHERE Id = 6
--UPDATE Modules SET Icon = 'bxs-group' WHERE Id = 8
--UPDATE Modules SET Icon = 'bxs-file-doc' WHERE Id = 9
--UPDATE Modules SET Icon = 'bxs-key' WHERE Id = 5

--UPDATE Modules SET [Key] = 'Transports' WHERE Id = 6
