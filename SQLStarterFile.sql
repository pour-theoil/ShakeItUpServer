USE [master]
GO

IF db_id('ShakItUpDB') IS NOT NULL
BEGIN
  ALTER DATABASE [ShakeItUpDB] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [ShakeItUp]
END
GO

CREATE DATABASE [ShakeItUpDB]
GO

USE [ShakeItUpDB]
GO

CREATE TABLE [dbo].[UserType] (
    [Id]   INT          IDENTITY (1, 1) NOT NULL,
    [Name] VARCHAR (25) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

GO

CREATE TABLE [dbo].[UserProfile] (
    [Id]             INT           IDENTITY (1, 1) NOT NULL,
    [Name]           VARCHAR (25)  NOT NULL,
    [Email]          VARCHAR (255) NOT NULL,
    [DateCreated]    DATETIME      NOT NULL,
    [UserTypeId]     INT           NOT NULL,
    [FirebaseUserId] VARCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    CONSTRAINT FK_UserProfile_UserType FOREIGN KEY (UserTypeId) REFERENCES UserType(Id),
    CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
);

GO

CREATE TABLE [dbo].[Cocktail] (
    [Id]            INT           IDENTITY (1, 1) NOT NULL,
    [Name]          VARCHAR (255) NOT NULL,
    [UserProfileId] INT           NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    
    CONSTRAINT FK_Cocktail_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id)
);
GO

CREATE TABLE [dbo].[IngredientType] (
    [Id]   INT          IDENTITY (1, 1) NOT NULL,
    [Name] VARCHAR (25) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

GO

CREATE TABLE [dbo].[Ingredient] (
    [Id]               INT           IDENTITY (1, 1) NOT NULL,
    [Name]             VARCHAR (255) NOT NULL,
    [IngredientTypeId] INT           NOT NULL,
    [Abv]              INT           NOT NULL,
    [IsDeleted]        BIT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    CONSTRAINT FK_Ingredient_IngredientType FOREIGN KEY (IngredientTypeId) REFERENCES IngredientType(Id)
);

GO

CREATE TABLE [dbo].[CocktailIngredient] (
    [Id]           INT             IDENTITY (1, 1) NOT NULL,
    [CocktailId]   INT             NOT NULL,
    [IngredientId] INT             NOT NULL,
    [Pour]         DECIMAL (18, 2) DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    
    CONSTRAINT FK_CocktailIngredient_Cocktail FOREIGN KEY (CocktailId) REFERENCES Cocktail(Id),
    CONSTRAINT FK_CocktailIngredient_Ingredient FOREIGN KEY (IngredientId) REFERENCES Ingredient(Id)
);

GO

CREATE TABLE [dbo].[Season] (
    [Id]   INT          IDENTITY (1, 1) NOT NULL,
    [Name] VARCHAR (25) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

GO

CREATE TABLE [dbo].[Menu] (
    [Id]            INT           IDENTITY (1, 1) NOT NULL,
    [Name]          VARCHAR (255) NOT NULL,
    [DateCreated]   DATETIME      NOT NULL,
    [SeasonId]      INT           NOT NULL,
    [UserProfileId] INT           NOT NULL,
    [Notes]         VARCHAR (MAX) NOT NULL,
    [IsDeleted]     BIT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    CONSTRAINT FK_Menu_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id),
    CONSTRAINT FK_Menu_Season FOREIGN KEY (SeasonId) REFERENCES Season(Id),
);

GO

CREATE TABLE [dbo].[CocktailMenu] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [CocktailId] INT NOT NULL,
    [MenuId]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    CONSTRAINT FK_CocktailMenu_Cocktail FOREIGN KEY (CocktailId) REFERENCES Cocktail(Id),
    CONSTRAINT FK_CocktailMenu_Menu FOREIGN KEY (MenuId) REFERENCES Menu(Id)
);

GO


CREATE TABLE [dbo].[UserIngredient] (
    [Id]            INT IDENTITY (1, 1) NOT NULL,
    [IngredientId]  INT NOT NULL,
    [UserProfileId] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    CONSTRAINT FK_UserIngredient_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id),
    CONSTRAINT FK_UserIngredient_Ingredient FOREIGN KEY (IngredientId) REFERENCES Ingredient(Id)

    
);

