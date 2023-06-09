USE [master]
GO
/****** Object:  Database [GesCit]    Script Date: 21/03/2023 12:50:58 a. m. ******/
CREATE DATABASE [GesCit]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GESCIT', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\GesCit.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GESCIT_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\GesCit_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [GesCit] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GesCit].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GesCit] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GesCit] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GesCit] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GesCit] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GesCit] SET ARITHABORT OFF 
GO
ALTER DATABASE [GesCit] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GesCit] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GesCit] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GesCit] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GesCit] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GesCit] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GesCit] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GesCit] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GesCit] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GesCit] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GesCit] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GesCit] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GesCit] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GesCit] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GesCit] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GesCit] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GesCit] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GesCit] SET RECOVERY FULL 
GO
ALTER DATABASE [GesCit] SET  MULTI_USER 
GO
ALTER DATABASE [GesCit] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GesCit] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GesCit] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GesCit] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GesCit] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GesCit] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [GesCit] SET QUERY_STORE = OFF
GO
USE [GesCit]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[AccountNum] [nvarchar](50) NOT NULL,
	[Rfc] [nvarchar](20) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
 CONSTRAINT [PK__Client__B9572BDA423C1E00] PRIMARY KEY CLUSTERED 
(
	[AccountNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dates]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dates](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountNum] [int] NULL,
	[UserId] [int] NULL,
	[ScheduleTimeId] [int] NULL,
	[OperationId] [int] NULL,
	[TransportLineId] [int] NULL,
	[TransportId] [int] NULL,
	[TransportPlate1] [nvarchar](50) NULL,
	[TransportPlate2] [nvarchar](50) NULL,
	[TransportPlate3] [nvarchar](50) NULL,
	[DriverId] [int] NULL,
	[ProductId] [int] NULL,
	[Volume] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentFiles]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentFiles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemporalDocumentId] [int] NULL,
	[ModuleId] [int] NULL,
	[UserId] [int] NULL,
	[DocumentId] [int] NULL,
	[FieldName] [varchar](255) NULL,
	[OriginalName] [varchar](255) NULL,
	[Mimetype] [varchar](255) NULL,
	[FileData] [varbinary](max) NULL,
	[Size] [int] NULL,
	[CreateDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Documents]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Documents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[DocumentTypeId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentType]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Drivers]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Drivers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Accountnum] [varchar](255) NOT NULL,
	[FirstName] [varchar](255) NOT NULL,
	[LastName] [varchar](255) NOT NULL,
	[SecondLastName] [varchar](255) NOT NULL,
	[PhoneNumber] [varchar](20) NOT NULL,
	[Birthdate] [date] NULL,
	[StatusId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ModuleCategories]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ModuleCategories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Key] [varchar](max) NULL,
	[Name] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
	[StatusId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modules]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modules](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Key] [varchar](max) NULL,
	[ModuleCategoriesId] [int] NULL,
	[Name] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
	[StatusId] [int] NULL,
	[Icon] [varchar](20) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operation]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PasswordRestTokens]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PasswordRestTokens](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[userName] [varchar](max) NULL,
	[Email] [varchar](max) NULL,
	[Token] [varchar](255) NULL,
	[Expired] [bit] NULL,
	[CreatedDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ItemId] [varchar](max) NULL,
	[Name] [varchar](max) NULL,
	[Unit] [varchar](max) NULL,
	[SecondaryUnit] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Key] [varchar](max) NULL,
	[Name] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
	[StatusId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesPermissions]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolesPermissions](
	[RolId] [int] NULL,
	[ModuleId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Key] [varchar](max) NULL,
	[Name] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TemporalDocuments]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemporalDocuments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DocumentFileId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransportLines]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransportLines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountNum] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[LineTypeId] [int] NULL,
	[StatusId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransportLineType]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransportLineType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transports]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountNum] [varchar](50) NULL,
	[TransportTypeId] [int] NULL,
	[TransportPlate1] [varchar](10) NULL,
	[TransportPlate2] [varchar](10) NULL,
	[TransportPlate3] [varchar](10) NULL,
	[Capacity] [int] NULL,
	[StatusId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransportSchedule]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransportSchedule](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ScheduleTimeId] [time](7) NULL,
	[OperationId] [nvarchar](50) NULL,
	[TransportLineId] [int] NULL,
	[TransportId] [int] NULL,
	[TransportPlate1] [nvarchar](50) NULL,
	[TransportPlate2] [nvarchar](50) NULL,
	[TransportPlate3] [nvarchar](50) NULL,
	[DriverId] [int] NULL,
	[ProductId] [int] NULL,
	[Volume] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransportType]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransportType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountNum] [nvarchar](50) NULL,
	[name] [varchar](50) NULL,
	[mail] [varchar](50) NULL,
	[userName] [varchar](50) NULL,
	[userTypeId] [int] NULL,
	[password] [varchar](50) NULL,
	[PrivacyNotice] [int] NULL,
	[RolId] [int] NULL,
	[LastPassword] [varchar](max) NULL,
	[PrivacyNoticeDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Dates] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[DocumentFiles] ADD  DEFAULT (getdate()) FOR [CreateDate]
GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateDates]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateDates]
    @DateId int,
    @UserId int,
    @SheduleTimeId int,
    @OperationTypeId int,
    @ProductId int,
    @TransportLineId int,
    @TransportId int,
    @TransportPlate varchar(50),
    @TransportPlate2 varchar(50),
    @TransportPlate3 varchar(50),
    @DriverId int,
    @Volume int,
    @Success BIT OUTPUT,
    @Message VARCHAR(100) OUTPUT
AS BEGIN
    SET NOCOUNT ON;
	DECLARE @AccountNum INT, @TransportTypeId INT;
	SET @AccountNum = (SELECT AccountNum FROM Users WHERE Id = @UserId)

    -- HAZ VALIDACIONES POR CADA DATO QUE RECIBES
    IF @UserId IS NULL OR @UserId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Hubo un error al procesar la cita'
        RETURN
    END

    IF @SheduleTimeId IS NULL OR @SheduleTimeId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar un horario'
        RETURN
    END

    IF @OperationTypeId IS NULL OR @OperationTypeId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar un tipo de operación'
        RETURN
    END

    IF @ProductId IS NULL OR @ProductId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar un producto'
        RETURN
    END

    IF @TransportLineId IS NULL OR @TransportLineId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar una línea de transporte'
        RETURN
    END

    IF @TransportId IS NULL OR @TransportId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar un transporte'
        RETURN
    END

	SET @TransportTypeId = (SELECT TransportTypeId FROM Transports WHERE Id = @TransportId)

	IF (LEN(LTRIM(RTRIM(@TransportPlate))) = 0)
	BEGIN
		SET @Success = 0
		SET @Message = 'Falta especificar la placa del transporte.'
		RETURN
	END

	IF ((@TransportTypeId = 2 AND LEN(LTRIM(RTRIM(@TransportPlate2))) = 0) 
		OR (@TransportTypeId = 5 AND LEN(LTRIM(RTRIM(@TransportPlate2))) = 0))
	BEGIN
		SET @Success = 0
		SET @Message = 'Falta especificar la placa de la caja 1.'
		RETURN
	END
		
	IF (@TransportTypeId = 5 AND LEN(LTRIM(RTRIM(@TransportPlate3))) = 0 )
	BEGIN
		SET @Success = 0
		SET @Message = 'Falta especificar la placa de la caja 2.'
		RETURN
	END

    IF @DriverId IS NULL OR @DriverId = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar un conductor'
        RETURN
    END

    IF @Volume IS NULL OR @Volume = 0
    BEGIN
        SET @Success = 0
        SET @Message = 'Es necesario asignar un volumen'
        RETURN
    END

    -- SI TODO ESTA BIEN, INSERTA LOS DATOS EN LA TABLA DATES
    IF @DateId IS NULL OR @DateId = 0
    BEGIN
        INSERT INTO [dbo].[Dates]
            ([UserId]
			,[AccountNum]
            ,[ScheduleTimeId]
            ,[OperationId]
            ,[ProductId]
            ,[TransportLineId]
            ,[TransportId]
            ,[TransportPlate1]
            ,[TransportPlate2]
            ,[TransportPlate3]
            ,[DriverId]
            ,[Volume])
        VALUES
            (@UserId
			,@AccountNum
            ,@SheduleTimeId
            ,@OperationTypeId
            ,@ProductId
            ,@TransportLineId
            ,@TransportId
            ,@TransportPlate
            ,@TransportPlate2
            ,@TransportPlate3
            ,@DriverId
            ,@Volume)

        SET @Success = 1
        SET @Message = 'Cita creada correctamente'
        RETURN
    END ELSE BEGIN
        -- ACTUALIZA LOS DATOS EN LA TABLA DATES
        UPDATE [dbo].[Dates]
        SET [UserId] = @UserId
			,[AccountNum] = @AccountNum
            ,[ScheduleTimeId] = @SheduleTimeId
            ,[OperationId] = @OperationTypeId
            ,[ProductId] = @ProductId
            ,[TransportLineId] = @TransportLineId
            ,[TransportId] = @TransportId
            ,[TransportPlate1] = @TransportPlate
            ,[TransportPlate2] = @TransportPlate2
            ,[TransportPlate3] = @TransportPlate3
            ,[DriverId] = @DriverId
            ,[Volume] = @Volume
        WHERE Id = @DateId
        
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateDriver]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateDriver]
@UserId INT,
@TemporalDocumentId INT,
@DriverId INT OUTPUT,
@FirstName VARCHAR(255),
@LastName VARCHAR(255),
@SecondLastName VARCHAR(255),
@PhoneNumber VARCHAR(20),
@Birthdate DATE,
@Success BIT OUTPUT,
@Message VARCHAR(100) OUTPUT
AS
BEGIN
	BEGIN TRY
		DECLARE @AccountNum VARCHAR(MAX),
		@StatusId INT = 1;

		IF @FirstName IS NULL OR @FirstName = ''
		BEGIN
			SET @Success = 0
			SET @Message = 'El nombre es un campo requerido.'
			RETURN
		END

		IF @LastName IS NULL OR @LastName = ''
		BEGIN
			SET @Success = 0
			SET @Message = 'El apellido es un campo requerido.'
			RETURN
		END

		IF @SecondLastName IS NULL OR @SecondLastName = ''
		BEGIN
			SET @Success = 0
			SET @Message = 'El apellido materno es un campo requerido.'
			RETURN
		END

		IF @PhoneNumber IS NULL OR @PhoneNumber = ''
		BEGIN
			SET @Success = 0
			SET @Message = 'El número telefónico es un campo requerido.'
			RETURN
		END

		SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId

		IF @DriverId IS NULL OR @DriverId = 0
		BEGIN
		
			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 3 AND TemporalDocumentId = @TemporalDocumentId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de INE.'
				RETURN
			END
			
			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 4 AND TemporalDocumentId = @TemporalDocumentId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Licencia.'
				RETURN
			END

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 6 AND TemporalDocumentId = @TemporalDocumentId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Comprobante de domicilio.'
				RETURN
			END

			-- Insertar un nuevo registro
			INSERT INTO Drivers (AccountNum, FirstName, LastName,SecondLastName, PhoneNumber, Birthdate, StatusId)
			VALUES (@AccountNum,@FirstName, @LastName,@SecondLastName, @PhoneNumber, @Birthdate, @StatusId)

			SET @DriverId = SCOPE_IDENTITY();
			UPDATE DocumentFiles SET ModuleId = @DriverId, TemporalDocumentId = NULL WHERE TemporalDocumentId = @TemporalDocumentId
			SET @TemporalDocumentId = 0;
			SET @Success = 1
			SET @Message = 'El registro ha sido insertado.'
			RETURN
		END
		ELSE
		BEGIN

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 3 AND ModuleId = @DriverId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de INE.'
				RETURN
			END
			
			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 4 AND ModuleId = @DriverId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Licencia.'
				RETURN
			END

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 6 AND ModuleId = @DriverId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Comprobante de domicilio.'
				RETURN
			END

			-- Actualizar el registro
			UPDATE Drivers
			SET FirstName = @FirstName,
				LastName = @LastName,
				SecondLastName = @SecondLastName,
				PhoneNumber = @PhoneNumber,
				Birthdate = @Birthdate,
				StatusId = @StatusId
			WHERE Id = @DriverId
			SET @Success = 1
			SET @Message = 'El registro ha sido actualizado.'
			RETURN
		END
	END TRY
	BEGIN CATCH
		SET @Success = 0
		SET @Message = 'Error: ' + ERROR_MESSAGE()
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateDriverDocument]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateDriverDocument]
	@UserId INT,
	@TemporalDocumentId INT OUTPUT,
	@DocumentId INT,
	@ModuleId INT,
	@FieldName VARCHAR(255),
	@OriginalName VARCHAR(255),
	@Mimetype VARCHAR(255),
	@FileData VARBINARY(MAX),
	@Size INT,
	@Success BIT OUTPUT,
	@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	DECLARE @DocumentFileId INT 

	-- Initialize success and message output parameters
	SET @Success = 0
	SET @Message = ''

	IF @DocumentId IS NULL OR @DocumentId = 0
	BEGIN
		SET @Message = 'Es necesario asignar el tipo de documento.'
		SET @Success = 0
		RETURN
	END

	IF @ModuleId IS NULL OR @ModuleId = 0
	BEGIN
		-- Insert document file without module id
		INSERT INTO DocumentFiles (UserId, TemporalDocumentId, DocumentId, FieldName, OriginalName, Mimetype, FileData, Size)
		VALUES (@UserId, @TemporalDocumentId, @DocumentId, @FieldName, @OriginalName, @Mimetype, @FileData, @Size)
		SET @DocumentFileId = SCOPE_IDENTITY();

		IF @TemporalDocumentId IS NULL OR @TemporalDocumentId = 0
		BEGIN
			-- Create new temporal document for the document file
			INSERT INTO TemporalDocuments (DocumentFileId) VALUES (@DocumentFileId)
			SET @TemporalDocumentId = SCOPE_IDENTITY()

			-- Update the temporal document id of the document file
			UPDATE DocumentFiles SET TemporalDocumentId = @TemporalDocumentId WHERE Id = @DocumentFileId
		END
		
		DELETE DocumentFiles WHERE Id != @DocumentFileId AND UserId = @UserId AND TemporalDocumentId = @TemporalDocumentId  AND DocumentId = @DocumentId
		
		SET @Message = 'Se ha guardado el archivo correctamente'
		SET @Success = 1

		RETURN
	END 
	-- Insert document file with module id
	INSERT INTO DocumentFiles (UserId, ModuleId, DocumentId, FieldName, OriginalName, Mimetype, FileData, Size)
	VALUES (@UserId, @ModuleId, @DocumentId, @FieldName, @OriginalName, @Mimetype, @FileData, @Size)
	
	SET @DocumentFileId = SCOPE_IDENTITY();

	DELETE DocumentFiles WHERE Id != @DocumentFileId AND UserId = @UserId AND ModuleId = @ModuleId  AND DocumentId = @DocumentId

	-- Set success output parameter to true
	SET @Success = 1
	SET @Message = 'Se ha guardado el archivo correctamente'
	SET @TemporalDocumentId = 0;

	RETURN
END

GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateLineDocuments]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateLineDocuments]
	@UserId INT,
	@TemporalDocumentId INT OUTPUT,
	@DocumentId INT,
	@ModuleId INT,
	@FieldName VARCHAR(255),
	@OriginalName VARCHAR(255),
	@Mimetype VARCHAR(255),
	@FileData VARBINARY(MAX),
	@Size INT,
	@Success BIT OUTPUT,
	@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	DECLARE @DocumentFileId INT 

	-- Initialize success and message output parameters
	SET @Success = 0
	SET @Message = ''

	IF @DocumentId IS NULL OR @DocumentId = 0
	BEGIN
		SET @Message = 'Es necesario asignar el tipo de documento.'
		SET @Success = 0
		RETURN
	END

	IF @ModuleId IS NULL OR @ModuleId = 0
	BEGIN

		-- Insert document file without module id
		INSERT INTO DocumentFiles (UserId, TemporalDocumentId, DocumentId, FieldName, OriginalName, Mimetype, FileData, Size)
		VALUES (@UserId, @TemporalDocumentId, @DocumentId, @FieldName, @OriginalName, @Mimetype, @FileData, @Size)
		SET @DocumentFileId = SCOPE_IDENTITY();

		IF @TemporalDocumentId IS NULL OR @TemporalDocumentId = 0
		BEGIN
			-- Create new temporal document for the document file
			INSERT INTO TemporalDocuments (DocumentFileId) VALUES (@DocumentFileId)
			SET @TemporalDocumentId = SCOPE_IDENTITY()

			-- Update the temporal document id of the document file
			UPDATE DocumentFiles SET TemporalDocumentId = @TemporalDocumentId WHERE Id = @DocumentFileId
		END
		
		DELETE DocumentFiles WHERE Id != @DocumentFileId AND UserId = @UserId AND TemporalDocumentId = @TemporalDocumentId  AND DocumentId = @DocumentId
		
		SET @Message = 'Se ha guardado el archivo correctamente'
		SET @Success = 1

		RETURN
	END 
	-- Insert document file with module id
	INSERT INTO DocumentFiles (UserId, ModuleId, DocumentId, FieldName, OriginalName, Mimetype, FileData, Size)
	VALUES (@UserId, @ModuleId, @DocumentId, @FieldName, @OriginalName, @Mimetype, @FileData, @Size)

	SET @DocumentFileId = SCOPE_IDENTITY();

	DELETE DocumentFiles WHERE Id != @DocumentFileId AND UserId = @UserId AND ModuleId = @ModuleId  AND DocumentId = @DocumentId

	-- Set success output parameter to true
	SET @Success = 1
	SET @Message = 'Se ha guardado el archivo correctamente'
	SET @TemporalDocumentId = 0;

	RETURN
END

GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateTransport]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateTransport]
@TransportId INT,
@UserId INT,
@TransportTypeId INT,
@TransportPlate1 VARCHAR(10),
@TransportPlate2 VARCHAR(10),
@TransportPlate3 VARCHAR(10),
@Capacity INT,
@Success BIT OUTPUT,
@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	BEGIN TRY
	
		DECLARE @AccountNum INT,
				@StatusId INT = 1;

		IF (@TransportTypeId IS NULL OR @TransportTypeId = 0)
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar el tipo de transporte.'
			RETURN
		END

		IF (LEN(LTRIM(RTRIM(@TransportPlate1))) = 0)
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar la placa del transporte.'
			RETURN
		END

		IF ((@TransportTypeId = 2 AND LEN(LTRIM(RTRIM(@TransportPlate2))) = 0) 
			OR (@TransportTypeId = 5 AND LEN(LTRIM(RTRIM(@TransportPlate2))) = 0))
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar la placa de la caja 1.'
			RETURN
		END
		
		IF (@TransportTypeId = 5 AND LEN(LTRIM(RTRIM(@TransportPlate3))) = 0 )
		BEGIN
			SET @Success = 0
			SET @Message = 'Falta especificar la placa de la caja 2.'
			RETURN
		END

		SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId

		IF @TransportId IS NULL OR @TransportId = 0
		BEGIN
			-- Insertar nuevo registro
			INSERT INTO Transports (
				AccountNum,
				TransportTypeId,
				TransportPlate1,
				TransportPlate2,
				TransportPlate3,
				Capacity,
				StatusId
			)
			VALUES (
				@AccountNum,
				@TransportTypeId,
				@TransportPlate1,
				@TransportPlate2,
				@TransportPlate3,
				@Capacity,
				@StatusId
			)
		SET @Message = 'Registro realizado con exito.'
		END
		ELSE
		BEGIN
			-- Actualizar registro existente
			UPDATE Transports
			SET
				--ClientId = @ClientId,
				TransportTypeId = @TransportTypeId,
				TransportPlate1 = @TransportPlate1,
				TransportPlate2 = @TransportPlate2,
				TransportPlate3 = @TransportPlate3,
				Capacity = @Capacity
				--StatusId = @StatusId
			WHERE Id = @TransportId
		SET @Message = 'Registro actualizado correctamente.'
		END

		SET @Success = 1
	END TRY
	BEGIN CATCH
		SET @Success = 0
		SET @Message = 'Error: ' + ERROR_MESSAGE()
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateTransportLine]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateTransportLine]
@TransportLineId INT OUTPUT,
@TemporalDocumentId INT OUTPUT,
@UserId INT,
@Name VARCHAR(50),
@LineTypeId INT,
@Success BIT OUTPUT,
@Message VARCHAR(100) OUTPUT
AS
BEGIN
	BEGIN TRY
		DECLARE @AccountNum VARCHAR(MAX);
		SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId

		IF @Name IS NULL OR @Name = ''
		BEGIN
			SET @Success = 0
			SET @Message = 'Es necesario asignar un nombre.'
			RETURN
		END

		IF @LineTypeId IS NULL OR @LineTypeId = 0
		BEGIN
			SET @Success = 0
			SET @Message = 'Es necesario asignar el tipo de linea.'
			RETURN
		END

		IF @TransportLineId IS NULL OR @TransportLineId = 0
		BEGIN

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 1 AND TemporalDocumentId = @TemporalDocumentId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Acta Constitutiva.'
				RETURN
			END

			-- Insertar un nuevo registro
			INSERT INTO TransportLines (AccountNum, Name, LineTypeId, StatusId)
			VALUES (@AccountNum, @Name, @LineTypeId, 1)

			SET @TransportLineId = SCOPE_IDENTITY();

			UPDATE DocumentFiles SET ModuleId = @TransportLineId, TemporalDocumentId = NULL WHERE TemporalDocumentId = @TemporalDocumentId
			SET @TemporalDocumentId = 0;

			SET @Success = 1
			SET @Message = 'Se inserto el registro.'
			RETURN
		END
		ELSE
		BEGIN

			IF NOT EXISTS(SELECT 1 FROM DocumentFiles WHERE DocumentId = 1 AND ModuleId = @TransportLineId)
			BEGIN
				SET @Success = 0
				SET @Message = 'Es necesario subir el documento de Acta Constitutiva.'
				RETURN
			END

			-- Actualizar el registro
			UPDATE TransportLines
			SET AccountNum = @AccountNum,
				Name = @Name,
				LineTypeId = @LineTypeId
			WHERE Id = @TransportLineId
			SET @Success = 1
			SET @Message = 'Se actualizo el registro.'
		RETURN
		END
	END TRY
	BEGIN CATCH
		SET @Success = 0
		SET @Message = 'Error: ' + ERROR_MESSAGE()
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SpAddOrUpdateUser]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpAddOrUpdateUser]
@AccountNum VARCHAR(50),
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
	IF @userTypeId = 1 
	BEGIN 
		SET @RolId = 1 
		SET @PrivacyNotice = 1
		SET @successMessage = 'Registro exitoso.';
	END
	ELSE IF  @userTypeId = 2 BEGIN
		SET @RolId = 4;
		SET @PrivacyNotice = 0;	
		SET @successMessage = 'Es necesario aceptar el aviso de privacidad.';
	END
	BEGIN TRY
		IF EXISTS(SELECT 1 FROM Users WHERE userName = @userName AND (password = @password OR LastPassword = @password))
		BEGIN
			UPDATE Users SET
			AccountNum = @AccountNum,
			name = @name,
			mail = @mail,
			userName = @userName,
			userTypeId = @userTypeId,
			password = @password,
			RolId = @RolId
			WHERE userName = @userName AND password = @password;
			
			SET @success = 1;
			SET @Id = (SELECT Id FROM Users WHERE userName = @userName AND (password = @password OR LastPassword = @password));
			SET @PrivacyNotice = (SELECT PrivacyNotice FROM Users WHERE Id = @Id);
			SET @PrivacyNotice = ISNULL(@PrivacyNotice,0);
			IF @PrivacyNotice = 0
			BEGIN
				SET @successMessage = 'Es necesario aceptar el aviso de privacidad.';
			END ELSE BEGIN
				SET @successMessage = 'Login correcto.';
			END
		END
		ELSE
		BEGIN
			INSERT INTO Users (AccountNum, name, mail, userName, userTypeId, password, RolId,PrivacyNotice)
			VALUES (@AccountNum, @name, @mail, @userName, @userTypeId, @password,@RolId,@PrivacyNotice);
	  
			SET @Id = SCOPE_IDENTITY();
			SET @success = 1;
		END
	END TRY
	BEGIN CATCH
		SET @errorMessage = 'Error al intentar actualizar o insertar el registro.';
		SET @success = 0;
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SpDeleteDocumentById]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpDeleteDocumentById]
@DocumentFileId INT,
@Success BIT OUTPUT,
@Message VARCHAR(100) OUTPUT
AS BEGIN

	DELETE FROM DocumentFiles WHERE Id = @DocumentFileId
	SET @Success = 1
	SET @Message = 'Se ha eliminado el archivo.'

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetDates]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetDates]
@UserId INT,
@StartDate VARCHAR(MAX) = NULL,
@EndDate VARCHAR(MAX) = NULL
AS BEGIN
	DECLARE @AccountNum INT;
	SET @AccountNum = (SELECT AccountNum FROM Users WHERE Id = @UserId)
	
	SELECT 
		FORMAT(d.CreatedDate,'dd-MM-yyyy') AS 'Fecha de Cita',
		d.Id AS Id,
		ISNULL(d.Id, 0) AS ScheduleTimeId,
		 CONCAT(
            FORMAT(CONVERT(datetime, st.StartTime), N'hh:mm tt'), ' a ',
            FORMAT(CONVERT(datetime, st.EndTime), N'hh:mm tt')
        ) AS  Horario,
		ISNULL(d.Id, 0) AS OperationId,
		ISNULL(o.Name, '') AS Operacion,
		ISNULL(d.Id, 0) AS TransportLineId,
		ISNULL(tl.Name, '') AS 'Linea de Transporte',
		ISNULL(d.TransportId, 0) AS TransportId,
		CONCAT(ISNULL(tt.Type,''), ' ', ISNULL(d.TransportPlate1,' '))  AS Transporte,
		ISNULL(d.TransportPlate1, 0) AS 'Placa de Transporte',
		ISNULL(d.TransportPlate2, 0) AS 'Placa de Caja #1',
		ISNULL(d.TransportPlate3, 0) AS 'Placa de Caja #2',
		ISNULL(d.DriverId, 0) AS DriverId,
		CONCAT(ISNULL(dr.FirstName,''),' ',ISNULL(dr.LastName,''),' ',ISNULL(dr.SecondLastName,'')) AS Chofer,
		ISNULL(d.ProductId, 0) AS ProductId,
		ISNULL(p.Name,'') AS Producto,
		ISNULL(d.Volume, 0) AS Volumen
	FROM dates d
	LEFT JOIN Schedule st ON d.ScheduleTimeId = st.Id
	LEFT JOIN Operation o ON d.OperationId = o.Id
	LEFT JOIN TransportLines tl ON d.TransportLineId = tl.Id
	LEFT JOIN Transports t ON t.Id = d.TransportId
	LEFT JOIN TransportType tt ON tt.Id = t.TransportTypeId
	LEFT JOIN Drivers dr ON d.DriverId = dr.Id
	LEFT JOIN Products p ON d.ProductId = p.Id
	WHERE d.AccountNum = @AccountNum 
	AND (ISNULL(@StartDate,'') = '' OR CAST(d.CreatedDate AS DATE) >= CAST(@StartDate AS DATE)) 
	AND (ISNULL(@EndDate,'') = '' OR CAST(d.CreatedDate AS DATE) <= CAST(@EndDate AS DATE))
	ORDER BY d.CreatedDate DESC

END

GO
/****** Object:  StoredProcedure [dbo].[SpGetDriverDocuments]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetDriverDocuments]
@DriverId INT,
@TemporalDocumentId INT
AS BEGIN

	IF @DriverId IS NULL OR @DriverId = 0
	BEGIN
		
		SELECT 
			f.Id,
			FORMAT(f.CreateDate,'dd-MM-yyyy') AS Fecha,
			d.Name AS 'Tipo de Documento',
			f.OriginalName AS 'Nombre'
		FROM DocumentFiles f
		LEFT JOIN Documents d ON d.Id = f.DocumentId
		WHERE TemporalDocumentId = @TemporalDocumentId

	END ELSE BEGIN
	
		SELECT 
			f.Id,
			FORMAT(f.CreateDate,'dd-MM-yyyy') AS Fecha,
			d.Name AS 'Tipo de Documento',
			f.OriginalName AS 'Nombre'
		FROM DocumentFiles f
		LEFT JOIN Documents d ON d.Id = f.DocumentId
		WHERE d.DocumentTypeId = 2 AND f.ModuleId = @DriverId
	END

END


GO
/****** Object:  StoredProcedure [dbo].[SpGetDrivers]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetDrivers]
    @UserId INT
AS
BEGIN
    DECLARE @AccountNum VARCHAR(255);
    SELECT @AccountNum = Accountnum FROM users WHERE Id = @UserId
    
    SELECT 
        ISNULL(d.Id, 0) AS Id, 
        ISNULL(d.FirstName, '') AS Nombre, 
        ISNULL(d.LastName, '') AS Apellido,
        ISNULL(d.SecondLastName, '') AS 'Apellido materno',
        ISNULL(d.PhoneNumber, '') AS Telefono,
        CONVERT(VARCHAR, CAST(d.Birthdate AS DATE), 103) AS 'Fecha de Nacimiento'
    FROM Drivers d
    WHERE d.Accountnum = @AccountNum

END

GO
/****** Object:  StoredProcedure [dbo].[SpGetDriversDocuments]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetDriversDocuments]
AS BEGIN

	SELECT 
		ISNULL(Id,0) AS Id,
		ISNULL(Name,'') AS Name
	FROM Documents WHERE DocumentTypeId = 2

END


GO
/****** Object:  StoredProcedure [dbo].[SpGetFileById]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetFileById]
@DocumentFilId INT
AS BEGIN

	SELECT 
		OriginalName,
		Mimetype,
		FileData
	FROM DocumentFiles WHERE Id = @DocumentFilId

END

GO
/****** Object:  StoredProcedure [dbo].[SpGetLineDocuments]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetLineDocuments]
@TransportLineId INT,
@TemporalDocumentId INT
AS BEGIN

	IF @TransportLineId IS NULL OR @TransportLineId = 0
	BEGIN
		
		SELECT 
			f.Id,
			FORMAT(f.CreateDate,'dd-MM-yyyy') AS Fecha,
			d.Name AS 'Tipo de Documento',
			f.OriginalName AS 'Nombre'
		FROM DocumentFiles f
		LEFT JOIN Documents d ON d.Id = f.DocumentId
		WHERE TemporalDocumentId = @TemporalDocumentId

	END ELSE BEGIN
	
		SELECT 
			f.Id,
			FORMAT(f.CreateDate,'dd-MM-yyyy') AS Fecha,
			d.Name AS 'Tipo de Documento',
			f.OriginalName AS 'Nombre'
		FROM DocumentFiles f
		LEFT JOIN Documents d ON d.Id = f.DocumentId
		WHERE d.DocumentTypeId = 1 AND f.ModuleId = @TransportLineId
	END

END


GO
/****** Object:  StoredProcedure [dbo].[SpGetOperationType]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetOperationType]
AS BEGIN

	SELECT Id,Name FROM Operation

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetOperationTypes]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetOperationTypes]
AS BEGIN

	SELECT Id, Name FROM Operation

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetProducts]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SpGetProducts]
AS BEGIN

	SELECT Id, Name FROM Products

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetRoles]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetRoles]
AS BEGIN

	SELECT 
		ISNULL(Id,0) AS Id,
		ISNULL(Name,'') AS Rol
	FROM Roles

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetSheduleTime]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetSheduleTime]
AS
BEGIN
    SELECT 
        Id,
        CONCAT(
            FORMAT(CONVERT(datetime, StartTime), N'hh:mm tt'), ' a ',
            FORMAT(CONVERT(datetime, EndTime), N'hh:mm tt')
        ) AS TimeRange
    FROM Schedule

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetTransportLineDocuments]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetTransportLineDocuments]
AS BEGIN

	SELECT 
		ISNULL(Id,0) AS Id,
		ISNULL(Name,'') AS Name
	FROM Documents WHERE DocumentTypeId = 1

END

GO
/****** Object:  StoredProcedure [dbo].[SpGetTransportLines]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetTransportLines]
	@UserId INT
AS
BEGIN
	DECLARE @AccountNum INT;
	SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId
	
	SELECT 
		ISNULL(tl.Id, 0) AS Id, 
		ISNULL(tl.Name, '') AS 'Linea de Transporte', 
		ISNULL(tl.LineTypeId, 0) AS LineTypeId,
		[type].Type AS 'Tipo de Linea'
	FROM TransportLines tl
	LEFT JOIN TransportLineType [type] ON [type].Id = tl.LineTypeId
	WHERE tl.AccountNum = @AccountNum

END

GO
/****** Object:  StoredProcedure [dbo].[SpGetTransportLineTypes]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetTransportLineTypes]
AS BEGIN

	SELECT 
		Id,
		ISNULL(Type,'') AS Type
	FROM TransportLineType

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetTransports]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetTransports]
  @TransportId INT,
  @UserId INT
AS
BEGIN

	DECLARE @AccountNum INT;
	SELECT @AccountNum = AccountNum FROM Users WHERE Id = @UserId;

  IF @TransportId IS NULL OR @TransportId = 0
    SELECT 
        t.Id
      --, t.ClientId
      , t.TransportTypeId
	  , ISNULL([type].Type,'') AS 'Tipo de Transporte'
      , ISNULL(t.TransportPlate1, '') AS 'Placa de Transporte'
      , ISNULL(t.TransportPlate2, '') AS 'Placa de Caja #1'
      , ISNULL(t.TransportPlate3, '') AS 'Placa de Caja #2'
      , ISNULL(t.Capacity,0)  AS 'Capacidad'
      --, t.StatusId
    FROM Transports t
	LEFT JOIN TransportType [type] ON [type].Id = t.TransportTypeId
	WHERE AccountNum = @AccountNum;
  ELSE
    SELECT 
        t.Id
      --, t.ClientId
      , t.TransportTypeId
	  , ISNULL([type].Type,'') AS 'Tipo de Transporte'
      , ISNULL(t.TransportPlate1, '') AS 'Placa de Transporte'
      , ISNULL(t.TransportPlate2, '') AS 'Placa de Caja #1'
      , ISNULL(t.TransportPlate3, '') AS 'Placa de Caja #2'
      , ISNULL(t.Capacity,0)  AS 'Capacidad'
      --, t.StatusId
    FROM Transports t
	LEFT JOIN TransportType [type] ON [type].Id = t.TransportTypeId
    WHERE t.Id = @TransportId;
END;

GO
/****** Object:  StoredProcedure [dbo].[SpGetTransportType]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetTransportType]
AS BEGIN

	SELECT 
		Id,
		ISNULL(Type,'') AS Type
	FROM TransportType

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetUserData]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpGetUserData]
@UserId INT
AS BEGIN

	SELECT 
		ISNULL(AccountNum,'') AS AccountNum,
		ISNULL(Name,'') AS Name,
		ISNULL(mail,'') AS mail,
		ISNULL(userName,'') AS userName
	FROM Users
	WHERE Id = @UserId

END
GO
/****** Object:  StoredProcedure [dbo].[SpGetUserRol]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SpGetUserRol]
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
/****** Object:  StoredProcedure [dbo].[SpInsertPasswordResetToekns]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpInsertPasswordResetToekns]
    @user VARCHAR(MAX),
    @email VARCHAR(MAX),
    @token VARCHAR(255),
	@Success BIT OUTPUT,
	@Message VARCHAR(MAX) OUTPUT
AS
BEGIN
	DECLARE @UserId INT;
	SELECT @UserId = Id FROM Users WHERE userName = @user AND mail = @email;

    INSERT INTO PasswordRestTokens (UserId, userName, Email, Token, Expired, CreatedDate)
    VALUES (@userId,@user, @email, @token, 0, GETDATE());
	SET @Success = 1;
	SET @Message = 'Se inserto el registro';
END
GO
/****** Object:  StoredProcedure [dbo].[SpLoginUser]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SpLoginUser]
@AccountNum VARCHAR(50),
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
	IF @userTypeId = 1 SET @RolId = 1 ELSE IF @userTypeId = 2 SET @RolId = 4;

	BEGIN TRY
		IF EXISTS(SELECT 1 FROM Users WHERE userName = @userName AND password = @password)
		BEGIN
			UPDATE Users SET
			AccountNum = @AccountNum,
			name = @name,
			mail = @mail,
			userName = @userName,
			userTypeId = @userTypeId,
			password = @password,
			RolId = @RolId
			WHERE userName = @userName AND password = @password;
			
			SET @success = 1;
			SET @Id = (SELECT Id FROM Users WHERE userName = @userName AND password = @password);
			SET @PrivacyNotice = (SELECT PrivacyNotice FROM Users WHERE Id = @Id);
			SET @successMessage = 'El registro se actualizó correctamente.';
		END
		ELSE
		BEGIN
			INSERT INTO Users (AccountNum, name, mail, userName, userTypeId, password, RolId,PrivacyNotice)
			VALUES (@AccountNum, @name, @mail, @userName, @userTypeId, @password,@RolId,0);
	  
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
/****** Object:  StoredProcedure [dbo].[SpUpdateNewPassword]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUpdateNewPassword]
@user VARCHAR(MAX),
@email VARCHAR(MAX),
@token VARCHAR(MAX),
@NewPassword VARCHAR(MAX),
@Success VARCHAR(MAX) OUTPUT,
@Message VARCHAR(MAX) OUTPUT
AS BEGIN
	DECLARE @LastPassword VARCHAR(MAX)

	SET @LastPassword = (SELECT password FROM Users WHERE userName = @user AND mail = @email)

	UPDATE Users SET password = @NewPassword, LastPassword = @LastPassword WHERE userName = @user AND mail = @email
	UPDATE PasswordRestTokens SET Expired = 1 WHERE userName = @user AND Email = @email AND Token = @token

	SET @Success = 1;
	SET @Message = 'Su contraseña ha sido restablecida correctamente';
	RETURN
	--UPDATE Users SET password = @NewPassword WHERE userName = @user AND mail = @email

END

GO
/****** Object:  StoredProcedure [dbo].[SpUpdatePermission]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SpUpdatePermission]
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
/****** Object:  StoredProcedure [dbo].[SpUserCategories]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUserCategories]
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
		LEFT JOIN RolesPermissions rp ON rp.ModuleId = m.Id
	WHERE rp.RolId = @RolId

END

GO
/****** Object:  StoredProcedure [dbo].[SpUserModules]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUserModules]
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
/****** Object:  StoredProcedure [dbo].[SpUserPrivacyNotice]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUserPrivacyNotice]
@UserId INT,
@success BIT OUTPUT
AS BEGIN

	UPDATE Users SET PrivacyNotice = 1, PrivacyNoticeDate = GETDATE() WHERE Id = @UserId
    SET @success = 1;
	RETURN
END

GO
/****** Object:  StoredProcedure [dbo].[SpUserRol]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpUserRol]
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
/****** Object:  StoredProcedure [dbo].[SpValidateChangePassword]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpValidateChangePassword]
@user VARCHAR(MAX),
@email VARCHAR(MAX),
@token VARCHAR(MAX),
@NewPassword VARCHAR(MAX),
@ConfirmedNewPassword VARCHAR(MAX),
@OldPassword VARCHAR(MAX) OUTPUT,
@Success BIT OUTPUT,
@Message VARCHAR(MAX) OUTPUT
AS BEGIN
	DECLARE @Expired BIT, @CreatedDate DATETIME;

	IF @NewPassword = NULL OR @NewPassword = ''
	BEGIN
		SET @Message = 'Es necesario asignar una nueva contraseña.'
		SET @Success = 0;
		RETURN
	END

	IF @ConfirmedNewPassword = NULL OR @ConfirmedNewPassword = ''
	BEGIN
		SET @Message = 'Es necesario confirmar tu contraseña.'
		SET @Success = 0;
		RETURN
	END
	
	IF NOT EXISTS(SELECT 1 FROM PasswordRestTokens WHERE userName = @user AND Email = @email AND Token = @token)
	BEGIN
		SET @Message = 'Hubo un problema con la solicitud, comunicate con un administrador.'
		SET @Success = 0;
		RETURN
	END

	SELECT @Expired = Expired, @CreatedDate = CreatedDate FROM PasswordRestTokens WHERE userName = @user AND Email = @email AND Token = @token

	IF @Expired = 1 
	BEGIN
		SET @Message = 'Su link ya fue utilizado o ha expirado, de ser necesario, solicite un nuevo cambio de contraseña.'
		SET @Success = 0;
		RETURN
	END

	IF @NewPassword != @ConfirmedNewPassword
	BEGIN
		SET @Message = 'Las contraseñas no coinciden.'
		SET @Success = 0;
		RETURN
	END
		SET @OldPassword = (SELECT [password] FROM Users WHERE userName = @user AND mail = @email)
		SET @Success = 1;
		SET @Message = 'Se ha generado el cambio de contraseña.'
		RETURN
	--UPDATE Users SET password = @NewPassword WHERE userName = @user AND mail = @email

END


GO
/****** Object:  StoredProcedure [dbo].[SpValidateUser]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpValidateUser]
@userName VARCHAR(50),
@password VARCHAR(50),
@success BIT OUTPUT,
@Id INT OUTPUT,
@PrivacyNotice INT OUTPUT,
@successMessage VARCHAR(100) OUTPUT,
@errorMessage VARCHAR(100) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		IF EXISTS(SELECT 1 FROM Users WHERE userName = @userName AND password = @password)
		BEGIN
			SELECT 
				@Id = Id, 
				@success = 1, 
				@PrivacyNotice = PrivacyNotice, 
				@successMessage = 'Usuario registrado.' 
				FROM Users 
				WHERE userName = @userName AND password = @password
		END
	END TRY
	BEGIN CATCH
		SET @errorMessage = 'Error al intentar actualizar o insertar el registro.';
		SET @success = 0;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SpValidateUserEmail]    Script Date: 21/03/2023 12:50:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpValidateUserEmail]
@User VARCHAR(MAX),
@Mail VARCHAR(MAX),
@MailExists BIT OUTPUT 
AS BEGIN

	IF EXISTS(SELECT 1 FROM Users WHERE mail = @Mail AND userName = @User) SET @MailExists = 1 ELSE SET @MailExists = 0
END
GO
USE [master]
GO
ALTER DATABASE [GesCit] SET  READ_WRITE 
GO
