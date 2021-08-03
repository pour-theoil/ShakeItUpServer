SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType]
  ([Id], [Name])
VALUES 
  (1, 'Admin'), 
  (2, 'User')

SET IDENTITY_INSERT [UserType] OFF


SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Name], [DateCreated], [Email], [UserTypeId], [FirebaseUserId] )
VALUES 
  (11, 'Admin', 08/01/2021, 'admin@shakeit.com', 1, 'UXptE7mT4vbcfHQx4ERuMoD9GSz1')

SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [IngredientType] ON
INSERT INTO [IngredientType]
  ([Id], [Name])
VALUES 
  (1, 'Spirit'), 
  (2, 'Modifier'), 
  (3, 'Acid'), 
  (4, 'Sweetner'), 
  (5, 'Wine'), 
  (6, 'Pantry'), 
  (7, 'Bitters')

SET IDENTITY_INSERT [IngredientType] OFF


SET IDENTITY_INSERT [Cocktail] ON
INSERT INTO [Cocktail]
  ([Id], [Name], [UserProfileId])
VALUES 
  (1, 'Negroni', 11), 
  (9, 'French 75', 11), 
  (10, 'Old Fashioned', 11), 
  (11, 'Daquiri', 11) 
SET IDENTITY_INSERT [Cocktail] OFF


SET IDENTITY_INSERT [Ingredient] ON
INSERT INTO [Ingredient]
  ([Id], [Name], [IngredientTypeId], [Abv], [IsDeleted])
VALUES 
  (1, 'Gin', 1, 42, 0), 
  (2, 'Spanish Rum', 1, 40, 0),
  (3, 'Lemon', 3, 0, 0),
  (4, 'Simple Syrup', 4, 0, 0),
  (5, 'Angostura', 7, 47, 0),
  (6, 'Sparkling Wine', 5, 17, 0),
  (7, 'Sweet Vermouth', 5, 17, 0),
  (8, 'Campari', 2, 28, 0),
  (9, 'Bourbon', 1, 45, 0),
  (10, 'Rye Whiskey', 1, 45, 0),
  (11, 'Lime', 3, 0, 0)

SET IDENTITY_INSERT [Ingredient] OFF



SET IDENTITY_INSERT [CocktailIngredient] ON

INSERT INTO [CocktailIngredient]
  ([Id], [CocktailId], [IngredientId], [Pour])
VALUES 
  (1, 1, 1, 1), 
  (2, 1, 8, 1),
  (3, 1, 7, 1),
  (4, 1, 1, 1),
  (5, 9, 1, 1.5),
  (6, 9, 3, 0.75),
  (7, 9, 4, 0.75),
  (8, 9, 6, 2),
  (9, 10, 10, 2.25),
  (10, 10, 4, 0.25),
  (11, 10, 5, 2),
  (12, 11, 2, 2),
  (13, 11, 11, 1),
  (14, 11, 4, .75)

SET IDENTITY_INSERT [CocktailIngredient] OFF

SET IDENTITY_INSERT [Season] ON
INSERT INTO [Season]
  ([Id], [Name])
VALUES 
  (1, 'Winter'), 
  (2, 'Spring'), 
  (3, 'Fall'), 
  (4, 'Winter')

SET IDENTITY_INSERT [Season] OFF

SET IDENTITY_INSERT [Menu] ON
INSERT INTO [Menu]
  ([Id], [Name], [DateCreated], [SeasonId],[UserProfileId], [Notes], [IsDeleted] )
VALUES 
  (5, 'Sample Menu', 08/01/2021, 1, 11, 'This is an example Menu', 0)

SET IDENTITY_INSERT [Menu] OFF


SET IDENTITY_INSERT [CocktailMenu] ON
INSERT INTO [CocktailMenu]
  ([Id], [CocktailId], [MenuId])
VALUES 
  (1, 1, 5), 
  (2, 9, 5),
  (3, 10, 5),
  (4, 11, 5)

SET IDENTITY_INSERT [CocktailMenu] OFF







