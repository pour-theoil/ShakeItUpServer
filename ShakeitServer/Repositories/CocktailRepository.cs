using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ShakeitServer.Models;
using ShakeitServer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public class CocktailRepository : BaseRepository, ICocktailRepository
    {
        public CocktailRepository(IConfiguration configuration) : base(configuration) { }
        public void UpdateCocktail(Cocktail cocktail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    var sql = @"Update Cocktail set
                                Name = @name;
                                where id = @cocktailId;
                                ";

                    if (cocktail.MenuId != 0)
                    {
                        sql += @"Insert into CocktailMenu (menuId, cocktailId)
                                values (@menuId, @cocktailId);
                                ";
                    }

                    if (cocktail.Ingredients.Count > 0)
                    {
                        sql += "Delete from CocktailIngredient where cocktailId = @cocktailId";
                        for (var i = 0; i < cocktail.Ingredients.Count; i++)
                        {
                            sql += $@"
                                    Insert into CocktailIngredient (cocktailId, IngredientId, pour)
                                    values (@cocktailId, @ingredientId{i}, @pour{i});";
                            DbUtils.AddParameter(cmd, $"@ingredientId{i}", cocktail.Ingredients[i].Id);
                            DbUtils.AddParameter(cmd, $"@pour{i}", cocktail.Ingredients[i].Pour);
                        }

                    }
                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@cocktailId", cocktail.Id);
                    DbUtils.AddParameter(cmd, "@menuId", cocktail.MenuId);
                    DbUtils.AddParameter(cmd, "@name", cocktail.Name);

                    cmd.ExecuteNonQuery();


                }
            }


        }

        public void DeleteCocktail(int cocktailId)
        {
            throw new NotImplementedException();
        }

        public List<Cocktail> GetAllCocktails(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  c.Id, c.name, c.UserProfileId, ci.Pour as IngredientPour, 
                                        ci.IngredientId as IngredientId, i.Name as IngredientName,
                                        cm.menuId as Menu
                                        from cocktail c left join cocktailingredient ci on ci.cocktailId = c.id
                                        left join Ingredient i on i.id = ci.IngredientId 
                                        left join cocktailmenu cm on cm.cocktailid = c.id
                                        where c.UserProfileId = @userProfileId";

                    DbUtils.AddParameter(cmd, "@userProfileId", id);
                    var reader = cmd.ExecuteReader();
                    var cocktails = new List<Cocktail>();
                    while (reader.Read())
                    {
                        var cocktailId = DbUtils.GetInt(reader, "Id");
                        var existingCocktail = cocktails.FirstOrDefault(c => c.Id == cocktailId);
                        if (existingCocktail == null)
                        {
                            existingCocktail = new Cocktail
                            {
                                Id = cocktailId,
                                Name = DbUtils.GetString(reader, "Name"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Ingredients = new List<CocktailIngredient>()
                            };
                            if (DbUtils.IsNotDbNull(reader, "Menu"))
                            {
                                existingCocktail.MenuId = DbUtils.GetInt(reader, "Menu");
                            };
                            cocktails.Add(existingCocktail);
                        }
                        if (DbUtils.IsNotDbNull(reader, "IngredientId"))
                        {
                            existingCocktail.Ingredients.Add(new CocktailIngredient()
                            {
                                Id = DbUtils.GetInt(reader, "IngredientId"),
                                Name = DbUtils.GetString(reader, "IngredientName"),
                                Pour = DbUtils.GetInt(reader, "IngredientPour")
                            });
                        }

                    }

                    reader.Close();

                    return cocktails;
                }

            }
        }

        public Cocktail GetCocktailById(int id)
        {
            throw new NotImplementedException();
        }

        public int NumIngredientInCocktails(int ingredientId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select count(id) as NumCocktails from cocktailIngredient where ingredientId = @ingredientId;";
                    DbUtils.AddParameter(cmd, "@ingredientId", ingredientId);

                    var reader = cmd.ExecuteReader();
                    var cocktails = 0;

                    while (reader.Read())
                    {
                        cocktails = DbUtils.GetInt(reader, "NumCocktails");
                    }
                    conn.Close();
                    return cocktails;
                }
            }
        }

        public void AddCocktail(Cocktail cocktail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Insert into Cocktail (name, userProfileId) Output inserted.id values(@name, @userProfileId);";
                    DbUtils.AddParameter(cmd, "@userProfileId", cocktail.UserProfileId);
                    DbUtils.AddParameter(cmd, "@name", cocktail.Name);
                    cocktail.Id = (int)cmd.ExecuteScalar();
                    
                }
            }


        }

        public void AddCocktailIngredients(Cocktail cocktail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    var sql = "";
                    if (cocktail.Ingredients.Count > 0)
                    {

                        for (var i = 0; i < cocktail.Ingredients.Count; i++)
                        {
                            sql += $@"
                                    Insert into CocktailIngredient (cocktailId, IngredientId, pour)
                                    values (@cocktailId, @ingredientId{i}, @pour{i});";
                            DbUtils.AddParameter(cmd, $"@ingredientId{i}", cocktail.Ingredients[i].Id);
                            DbUtils.AddParameter(cmd, $"@pour{i}", cocktail.Ingredients[i].Pour);
                        }

                    }
                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@cocktailId", cocktail.Id);
                    cmd.ExecuteNonQuery();
                }
            }


        }
        public int NumberCocktailsOnMenu(int menuId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select count(id) as NumCocktails from cocktailmenu where menuId = @menuId;";
                    DbUtils.AddParameter(cmd, "@menuId", menuId);

                    var reader = cmd.ExecuteReader();
                    var cocktails = 0;

                    while (reader.Read())
                    {
                        cocktails = DbUtils.GetInt(reader, "NumCocktails");
                    }
                    conn.Close();
                    return cocktails;
                }
            }
        }


        public Cocktail CocktailIngredients(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  c.Id, c.name, c.UserProfileId, ci.Pour as IngredientPour, 
                                        ci.IngredientId as IngredientId, i.Name as IngredientName,
                                        cm.menuId as Menu
                                        from cocktail c left join cocktailingredient ci on ci.cocktailId = c.id
                                        left join Ingredient i on i.id = ci.IngredientId                                              
                                        left join cocktailmenu cm on cm.cocktailid = c.id
                                        where c.id = @cocktailId";

                    DbUtils.AddParameter(cmd, "@cocktailId", id);
                    var reader = cmd.ExecuteReader();
                    Cocktail cocktail = null;


                    while (reader.Read())
                    {
                        if (cocktail == null)
                        {
                            cocktail = new Cocktail()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Ingredients = new List<CocktailIngredient>()
                            };
                            if (DbUtils.IsNotDbNull(reader, "Menu"))
                            {
                                cocktail.MenuId = DbUtils.GetInt(reader, "Menu");
                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "IngredientId"))
                        {
                            cocktail.Ingredients.Add(new CocktailIngredient()
                            {
                                Id = DbUtils.GetInt(reader, "IngredientId"),
                                Name = DbUtils.GetString(reader, "IngredientName"),
                                Pour = DbUtils.GetInt(reader, "IngredientPour")
                            });
                        }
                    }

                    reader.Close();

                    return cocktail;
                }

            }
        }


        private Cocktail NewCocktailFromDb(SqlDataReader reader)
        {
            return new Cocktail()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
            };
        }
    }
}
