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
        public void AddCocktail(Cocktail cocktail)
        {
            throw new NotImplementedException();
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
                    cmd.CommandText = @"select  Id, name, userprofileId
                                                from cocktail
                                                where userprofileId = @userProfileId";

                    DbUtils.AddParameter(cmd, "@userProfileId", id);
                    var reader = cmd.ExecuteReader();
                    var cocktails = new List<Cocktail>();
                    while (reader.Read())
                    {
                        cocktails.Add(NewCocktailFromDb(reader));
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
            using( var conn = Connection)
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

        public void UpdateCocktail(Cocktail cocktail)
        {
            throw new NotImplementedException();
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
                                        ci.IngredientId as IngredientId, i.Name as IngredientName
                                        from cocktail c left join cocktailingredient ci on ci.cocktailId = c.id
                                        left join Ingredient i on i.id = ci.IngredientId                                              
                                        where c.id = @cocktailId";

                    DbUtils.AddParameter(cmd, "@cocktailId", id);
                    var reader = cmd.ExecuteReader();
                    Cocktail cocktail = null;
                    
                    
                    while (reader.Read())
                    {
                       if(cocktail == null)
                        {
                            cocktail = new Cocktail()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Ingredients = new List<CocktailIngredient>()
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
