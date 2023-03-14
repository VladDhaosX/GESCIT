SELECT * FROM Users
SELECT * FROM Roles
SELECT * FROM ModulePermissions

--DROP TABLE Users
--TRUNCATE TABLE Users

CREATE TABLE Users (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  userId VARCHAR(50),
  name VARCHAR(50),
  mail VARCHAR(50),
  userName VARCHAR(50),
  userTypeId INT,
  password VARCHAR(50),
  PrivacyNotice INT,
  RolId INT
);

GO

ALTER PROCEDURE SpLoginUser
@userId VARCHAR(50),
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
		IF EXISTS(SELECT * FROM Users WHERE userId = @userId)
		BEGIN
			UPDATE Users SET
			name = @name,
			mail = @mail,
			userName = @userName,
			userTypeId = @userTypeId,
			password = @password,
			RolId = @RolId
			WHERE userId = @userId;
			
			SET @success = 1;
			SET @Id = (SELECT Id FROM Users WHERE userId = @userId);
			SET @PrivacyNotice = (SELECT PrivacyNotice FROM Users WHERE userId = @userId);
			SET @successMessage = 'El registro se actualizó correctamente.';
		END
		ELSE
		BEGIN
			INSERT INTO Users (userId, name, mail, userName, userTypeId, password, RolId)
			VALUES (@userId, @name, @mail, @userName, @userTypeId, @password,@RolId);
	  
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