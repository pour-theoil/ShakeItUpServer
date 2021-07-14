USE [master]
GO

IF db_id('Streamish') IS NOT NULL
BEGIN
  ALTER DATABASE [ShakeItUp] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [ShakeItUp]
END
GO

CREATE DATABASE [ShakeItUp]
GO

USE [ShakeItUp]
GO

---------------------------------------------------------------------------

CREATE TABLE [UserProfile] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(25) NOT NULL,
  [Email] VARCHAR(255) NOT NULL,
  [DateCreated] DATETIME NOT NULL,
  [UserType] VARCHAR(25) NOT NULL
 
)
GO

CREATE TABLE [Cocktail] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(255) NOT NULL,
  [UserProfileId] INTEGER NOT NULL,

)
GO

CREATE TABLE [CocktailIngredient] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [CocktailId] INTEGER NOT NULL,
  [IngredientId] INTEGER NOT NULL,
  [Pour] INTEGER NOT NULL

)
GO

CREATE TABLE [CocktailMenu] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [CocktailId] INTEGER NOT NULL,
  [MenuId] INTEGER NOT NULL

)
GO

CREATE TABLE [Ingredient] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(255) NOT NULL,
  [IngredientTypeId] INTEGER NOT NULL,
  [Abv] INTEGER NOT NULL

)
GO

CREATE TABLE [Menu] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(255) NOT NULL,
  [DateCreated] DATETIME NOT NULL,
  [SeasonId] INTEGER NOT NULL,
  [UserProfileId] INTEGER NOT NULL,
  [Notes] VARCHAR(MAX) NOT NULL,

)
GO
 
 CREATE TABLE [Season] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(25) NOT NULL

)
GO

 CREATE TABLE [UserType] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(25) NOT NULL

)
GO


---------------------------------------------------------------------------
/* Reference for entry data
SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
    ([Id], [Name], [Email], [DateCreated], [ImageUrl])
VALUES
    (1, 'Groucho', 'groucho@marx.com', SYSDATETIME(), NULL),
    (2, 'Harpo', 'harpo@marx.com', SYSDATETIME(), NULL),
    (3, 'Chico', 'chico@marx.com', SYSDATETIME(), NULL);
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Video] ON
INSERT INTO [Video]
    ([Id], [DateCreated], [Title], [Description], [Url], [UserProfileId])
VALUES
    (1, '2019-10-3', 'Erlang the Movie', 'A beautiful film about an elegant, but ugly lanaguage', 'https://www.youtube.com/embed/xrIjfIjssLE', 1),
    (2, '2019-5-20', 'Early Computing', 'Early Computing: Crash Course Computer Science #1', 'https://www.youtube.com/embed/O5nskjZ_GoI', 2),
    (3, '2020-1-2', 'C# 101', 'What is C#? It''s a powerful and widely used programming language that you can use to make websites, games, mobile apps, desktop apps and more with .NET', 'https://www.youtube.com/embed/BM4CHBmAPh4', 2),
    (4, '2020-12-15', '.NET 101', 'What is .NET, anyway?', 'https://www.youtube.com/embed/eIHKZfgddLM', 3)
SET IDENTITY_INSERT [Video] OFF


SET IDENTITY_INSERT [Comment] ON
INSERT INTO [Comment]
    ([Id], [Message], [VideoId], [UserProfileId])
VALUES
    (1, 'I have thoughts about this video! ...thoughts AND OPINIONS!', 1, 2),
    (2, 'This video makes me angry on the internet!!!', 1, 3)
SET IDENTITY_INSERT [Comment] OFF
*/