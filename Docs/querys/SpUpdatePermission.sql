
ALTER PROCEDURE SpUpdatePermission
@Permissions_UserId INT,
@RolId INT,
@success BIT OUTPUT,
@successMessage VARCHAR(100) OUTPUT,
@errorMessage VARCHAR(100) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY

		IF @RolId = 0 OR @RolId IS NULL
		BEGIN
			SET @success = 0;
			SET @successMessage = 'Es necesario asignar un rol.';
			
			RETURN
		END

		UPDATE Users SET RolId = @RolId
		SET @success = 1;
		SET @successMessage = 'El registro se actualizo correctamente.';
	END TRY
	BEGIN CATCH
		SET @errorMessage = 'Error al intentar actualizar o insertar el registro.';
		SET @success = 0;
	END CATCH
END

GO