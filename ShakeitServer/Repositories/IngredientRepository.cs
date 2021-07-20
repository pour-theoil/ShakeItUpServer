using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ShakeitServer.Controllers;
using Microsoft.Data.SqlClient;
using ShakeitServer.Models;
using ShakeitServer.Utils;

namespace ShakeitServer.Repositories
{
    public class IngredientRepository : BaseRepository, IIngredientRepository
    {
        public IngredientRepository(IConfiguration configuration) : base(configuration) { }

        public List<Ingredient> GetAllIngredients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  i.id, i.name, i.abv, i.UserProfileId
                                                t.id as IngredientTypeId t.name as IngredientName
                                                from ingredient i join ingredienttype t on i.IngredientTypeId = t.id
                                                where i.IsDeleted = 0";
                    var reader = cmd.ExecuteReader();
                    var ingredients = new List<Ingredient>();
                    while (reader.Read())
                    {
                        ingredients.Add(NewIngredientFromDb(reader));
                    }

                    reader.Close();

                    return ingredients;
                }

            }
        }

        public Ingredient GetIngredientById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  i.id, i.name, i.abv, i.UserProfileId
                                        t.id as IngredientTypeId t.name as IngredientName
                                        from ingredient i join ingredienttype t on i.IngredientTypeId = t.id
                                        where i.id = @id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    Ingredient ingredient = null;
                    while (reader.Read())
                    {
                        if (ingredient == null)
                        {
                            ingredient = NewIngredientFromDb(reader);
                        }
                    }

                    reader.Close();
                    return ingredient;
                }

            }
        }

        public void AddIngredient(Ingredient ingredient)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Insert into Ingredient (Name, IngredientTypeId, Abv, UserProfileId)
                                        Output inserted.id
                                        values (@name, @ingredienttypeid, @abv, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@name", ingredient.Name);
                    DbUtils.AddParameter(cmd, "@ingredienttypeid", ingredient.IngredientTypeId);
                    DbUtils.AddParameter(cmd, "@abv", ingredient.Abv);
                    DbUtils.AddParameter(cmd, "@UserProfileId", ingredient.UserProfileId);

                    ingredient.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateIngredient(Ingredient ingredient)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Update Ingredient
                                        Set Name = @name,
                                            IngredientTypeId = @ingredienttypeid,
                                            Abv = @abv,
                                            UserProfileId = @UserProfileId
                                        Where Id = @id";
                    DbUtils.AddParameter(cmd, "@id", ingredient.Id);
                    DbUtils.AddParameter(cmd, "@name", ingredient.Name);
                    DbUtils.AddParameter(cmd, "@ingredienttypeid", ingredient.IngredientTypeId);
                    DbUtils.AddParameter(cmd, "@abv", ingredient.Abv);
                    DbUtils.AddParameter(cmd, "@UserProfileId", ingredient.UserProfileId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteIngredient(int ingredientId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update Ingredient Set IsDeleted = 1 where Id = @id";
                    DbUtils.AddParameter(cmd, "@id", ingredientId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Ingredient NewIngredientFromDb(SqlDataReader reader)
        {
            return new Ingredient()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                IngredientTypeId = DbUtils.GetInt(reader, "IngredientTypeId"),
                Abv = DbUtils.GetInt(reader, "Abv"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                IngredientType = new IngredientType()
                {
                    Id = DbUtils.GetInt(reader, "IngredientTypeId"),
                    Name = DbUtils.GetString(reader, "IngredientName"),
                }

            };
        }
    }
}
