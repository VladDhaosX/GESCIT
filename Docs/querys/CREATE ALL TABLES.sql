CREATE TABLE [dbo].[Client] (
    [AccountNum] nvarchar(50) NOT NULL,
    [Rfc] nvarchar(20) NOT NULL,
    [Name] nvarchar(500) NOT NULL
);

CREATE TABLE [dbo].[Dates] (
    [Id] int NOT NULL,
    [AccountNum] int,
    [UserId] int,
    [ScheduleTimeId] int,
    [OperationId] int,
    [TransportLineId] int,
    [TransportId] int,
    [TransportPlate1] nvarchar(50),
    [TransportPlate2] nvarchar(50),
    [TransportPlate3] nvarchar(50),
    [DriverId] int,
    [ProductId] int,
    [Volume] nvarchar(50),
    [CreatedDate] datetime
);

CREATE TABLE [dbo].[DocumentFiles] (
    [Id] int NOT NULL,
    [TemporalDocumentId] int,
    [ModuleId] int,
    [UserId] int,
    [DocumentId] int,
    [FieldName] varchar(255),
    [OriginalName] varchar(255),
    [Mimetype] varchar(255),
    [FileData] varbinary(MAX),
    [Size] int,
    [CreateDate] datetime
);

CREATE TABLE [dbo].[Documents] (
    [Id] int NOT NULL,
    [Name] varchar(50) NOT NULL,
    [DocumentTypeId] varchar(50) NOT NULL
);

CREATE TABLE [dbo].[DocumentType] (
    [Id] int NOT NULL,
    [Name] varchar(50) NOT NULL
);

CREATE TABLE [dbo].[Drivers] (
    [Id] int NOT NULL,
    [Accountnum] varchar(255) NOT NULL,
    [FirstName] varchar(255) NOT NULL,
    [LastName] varchar(255) NOT NULL,
    [SecondLastName] varchar(255) NOT NULL,
    [PhoneNumber] varchar(20) NOT NULL,
    [Birthdate] date,
    [StatusId] int NOT NULL
);

CREATE TABLE [dbo].[ModuleCategories] (
    [Id] int NOT NULL,
    [Key] varchar(MAX),
    [Name] varchar(MAX),
    [Description] varchar(MAX),
    [StatusId] int
);

CREATE TABLE [dbo].[Modules] (
    [Id] int NOT NULL,
    [Key] varchar(MAX),
    [ModuleCategoriesId] int,
    [Name] varchar(MAX),
    [Description] varchar(MAX),
    [StatusId] int,
    [Icon] varchar(20)
);

CREATE TABLE [dbo].[Operation] ([Id] int NOT NULL, [Name] varchar(MAX));

CREATE TABLE [dbo].[PasswordRestTokens] (
    [Id] int NOT NULL,
    [UserId] int,
    [userName] varchar(MAX),
    [Email] varchar(MAX),
    [Token] varchar(255),
    [Expired] bit,
    [CreatedDate] datetime
);

CREATE TABLE [dbo].[Products] (
    [Id] int NOT NULL,
    [ItemId] varchar(MAX),
    [Name] varchar(MAX),
    [Unit] varchar(MAX),
    [SecondaryUnit] varchar(MAX)
);

CREATE TABLE [dbo].[Roles] (
    [Id] int NOT NULL,
    [Key] varchar(MAX),
    [Name] varchar(MAX),
    [Description] varchar(MAX),
    [StatusId] int
);

CREATE TABLE [dbo].[RolesPermissions] ([RolId] int, [ModuleId] int);

CREATE TABLE [dbo].[Schedule] (
    [Id] int NOT NULL,
    [StartTime] time NOT NULL,
    [EndTime] time NOT NULL
);

CREATE TABLE [dbo].[Status] (
    [Id] int NOT NULL,
    [Key] varchar(MAX),
    [Name] varchar(MAX)
);

CREATE TABLE [dbo].[TemporalDocuments] (
    [Id] int NOT NULL,
    [DocumentFileId] int
);

CREATE TABLE [dbo].[TransportLines] (
    [Id] int NOT NULL,
    [AccountNum] nvarchar(50),
    [Name] nvarchar(50),
    [LineTypeId] int,
    [StatusId] int
);

CREATE TABLE [dbo].[TransportLineType] (
    [Id] int NOT NULL,
    [Type] varchar(20) NOT NULL
);

CREATE TABLE [dbo].[Transports] (
    [Id] int NOT NULL,
    [AccountNum] varchar(50),
    [TransportTypeId] int,
    [TransportPlate1] varchar(10),
    [TransportPlate2] varchar(10),
    [TransportPlate3] varchar(10),
    [Capacity] int,
    [StatusId] int
);

CREATE TABLE [dbo].[TransportSchedule] (
    [Id] int NOT NULL,
    [ScheduleTimeId] time,
    [OperationId] nvarchar(50),
    [TransportLineId] int,
    [TransportId] int,
    [TransportPlate1] nvarchar(50),
    [TransportPlate2] nvarchar(50),
    [TransportPlate3] nvarchar(50),
    [DriverId] int,
    [ProductId] int,
    [Volume] nvarchar(50)
);

CREATE TABLE [dbo].[TransportType] (
    [Id] int NOT NULL,
    [Type] varchar(20) NOT NULL
);

CREATE TABLE [dbo].[Users] (
    [Id] int NOT NULL,
    [AccountNum] nvarchar(50),
    [name] varchar(50),
    [mail] varchar(50),
    [userName] varchar(50),
    [userTypeId] int,
    [password] varchar(50),
    [PrivacyNotice] int,
    [RolId] int,
    [LastPassword] varchar(MAX),
    [PrivacyNoticeDate] datetime
);