--SELECT * FROM Users
--SELECT * FROM Roles
--SELECT * FROM ModulePermissions

--DROP TABLE Users
--TRUNCATE TABLE Users

--CREATE TABLE Users (
--  Id INT IDENTITY(1,1) PRIMARY KEY,
--  ActiveDirectoryId uniqueidentifier,
--  name VARCHAR(50),
--  mail VARCHAR(50),
--  userName VARCHAR(50),
--  userTypeId INT,
--  password VARCHAR(50),
--  PrivacyNotice INT,
--  RolId INT,
--  ClientId INT
--);


GO

ALTER PROCEDURE SpLoginUser
@ActiveDirectoryId VARCHAR(50),
@name VARCHAR(50),
@mail VARCHAR(50),
@userName VARCHAR(50),
@userTypeId INT,
@password VARCHAR(50),
@success BIT OUTPUT,
@Id INT OUTPUT,
@PrivacyNotice INT OUTPUT,
@successMessage VARCHAR(100) OUTPUT,
@errorMessage VARCHAR(100) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @RolId INT;
	IF @userTypeId = 1 SET @RolId = 0 ELSE IF @userTypeId = 2 SET @RolId = 4;

	BEGIN TRY
		IF EXISTS(SELECT * FROM Users WHERE ActiveDirectoryId = @ActiveDirectoryId)
		BEGIN
			UPDATE Users SET
			name = @name,
			mail = @mail,
			userName = @userName,
			userTypeId = @userTypeId,
			password = @password,
			RolId = @RolId
			WHERE ActiveDirectoryId = @ActiveDirectoryId;
			
			SET @success = 1;
			SET @Id = (SELECT Id FROM Users WHERE ActiveDirectoryId = @ActiveDirectoryId);
			SET @PrivacyNotice = (SELECT PrivacyNotice FROM Users WHERE ActiveDirectoryId = @ActiveDirectoryId);
			SET @successMessage = 'El registro se actualizó correctamente.';
		END
		ELSE
		BEGIN
			INSERT INTO Users (ActiveDirectoryId, name, mail, userName, userTypeId, password, RolId)
			VALUES (@ActiveDirectoryId, @name, @mail, @userName, @userTypeId, @password,@RolId);
	  
			SET @Id = SCOPE_IDENTITY();
			SET @success = 1;
			SET @PrivacyNotice = 0;
			SET @successMessage = 'El registro se insertó correctamente.';
		END
	END TRY
	BEGIN CATCH
		SET @errorMessage = 'Error al intentar actualizar o insertar el registro.';
		SET @success = 0;
	END CATCH
END

GO