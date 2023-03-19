CREATE TABLE PasswordRestTokens (
  Id INT IDENTITY(1,1),
  UserId INT,
  userName VARCHAR(MAX),
  Email VARCHAR(MAX),
  Token VARCHAR(255),
  Expired BIT,
  CreatedDate DATETIME
);

GO

--DROP TABLE PasswordRestTokens