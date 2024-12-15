CREATE TABLE Recipes (
    RecipeID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    Description TEXT
);

CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE Recipe_Categories (
    RecipeID INT NOT NULL,
    CategoryID INT NOT NULL,
    PRIMARY KEY (RecipeID, CategoryID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Ingredients (
    IngredientID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE Recipe_Ingredients (
    RecipeID INT NOT NULL,
    IngredientID INT NOT NULL,
    Quantity FLOAT,
    Unit VARCHAR(20), 
    PRIMARY KEY (RecipeID, IngredientID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);

CREATE TABLE Steps (
    StepID INT AUTO_INCREMENT PRIMARY KEY,
    Description TEXT NOT NULL
);

CREATE TABLE Recipe_Steps (
    RecipeID INT NOT NULL,
    StepID INT NOT NULL,
    StepOrder INT NOT NULL,
    PRIMARY KEY (RecipeID, StepID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE,
    FOREIGN KEY (StepID) REFERENCES Steps(StepID) ON DELETE CASCADE

);
