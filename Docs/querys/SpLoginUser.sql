ALTER PROCEDURE SpLoginUser
    @username VARCHAR(MAX),
    @password VARCHAR(MAX),
    @successMessage VARCHAR(MAX) OUTPUT,
    @errorMessage VARCHAR(MAX) OUTPUT,
	@userId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @userPassword VARCHAR(MAX);
    DECLARE @userStatusId INT;
    DECLARE @PrivacyNotice INT;

    -- Check if user exists
    SELECT @userId = Id, @userPassword = Password, @userStatusId = StatusId, @PrivacyNotice = PrivacyNotice
    FROM Users
    WHERE [User] = @username

    IF @@ROWCOUNT = 0
    BEGIN
        SET @errorMessage = 'El usuario no existe';
        RETURN;
    END

    -- Check if password is correct
    IF @userPassword <> @password
    BEGIN
        SET @errorMessage = 'La contraseña es incorrecta';
        RETURN;
    END

    -- Check if user is active
    IF @userStatusId <> 1
    BEGIN
        SET @errorMessage = 'El usuario no está activo';
        RETURN;
    END

    -- Check if Privacy Notice is accepted
    IF @PrivacyNotice <> 1
    BEGIN
        SET @errorMessage = 'Es necesario aceptar el archivo de privacidad';
        RETURN;
    END

    SET @successMessage = 'Inicio de sesión exitoso';
END

GO

