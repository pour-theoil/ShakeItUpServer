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

        public List<Ingredient> GetAllIngredients(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  distinct i.id, i.name, i.abv, 
                                                t.id as IngredientTypeId, t.name as IngredientName
                                                from userIngredient uI join ingredient i on uI.ingredientId = i.id
                                                left join ingredienttype t on i.IngredientTypeId = t.id
                                                where uI.userprofileId = @userprofileId;
                                                ";
                    DbUtils.AddParameter(cmd, "@userprofileId", userProfileId);
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
        public List<Ingredient> GetAllDataBaseIngredients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select * from ingredient";

                    var reader = cmd.ExecuteReader();
                    var ingredients = new List<Ingredient>();
                    while (reader.Read())
                    {
                        var ingredient = new Ingredient()
                        {

                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            IngredientTypeId = DbUtils.GetInt(reader, "IngredientTypeId"),
                            Abv = DbUtils.GetInt(reader, "Abv")
                        };
                        ingredients.Add(ingredient);
                    }

                    reader.Close();

                    return ingredients;
                }

            }
        }

        public void BuildNewUserIngredients(List<Ingredient> ingredients, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = "";

                    for( var i = 0; i < ingredients.Count; i++)
                    {
                        sql += $@"
                                    Insert into UserIngredient (userProfileId, ingredientId) 
                                    values (@userProfileId, @ingedientId{i});";
                        DbUtils.AddParameter(cmd, $"@ingedientId{i}", ingredients[i].Id);
                    }
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    cmd.CommandText = sql;
                    cmd.ExecuteNonQuery();
                }

            }
        }

        public List<Ingredient> GetIngredientsByType(int typeId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  i.id, i.name, i.abv, 
                                                t.id as IngredientTypeId, t.name as IngredientName
                                                from userIngredient uI join ingredient i on uI.ingredientId = i.id
                                                left join ingredienttype t on i.IngredientTypeId = t.id
                                                where uI.userprofileId = @userprofileId and i.IngredientTypeId = @typeId";

                    DbUtils.AddParameter(cmd, "@userprofileId", userProfileId);
                    DbUtils.AddParameter(cmd, "@typeId", typeId);
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
        public Ingredient GetIngredientById(int ingredientId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  i.id, i.name, i.abv, 
                                                t.id as IngredientTypeId, t.name as IngredientName
                                                from userIngredient uI join ingredient i on uI.ingredientId = i.id
                                                left join ingredienttype t on i.IngredientTypeId = t.id
                                                where uI.userprofileId = @userprofileId and uI.IngredientId = @ingredientId";

                    DbUtils.AddParameter(cmd, "@ingredientId", ingredientId);
                    DbUtils.AddParameter(cmd, "@userprofileId", userProfileId);
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
        public void AddUserIngredient(int ingredientId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Insert into UserIngredient (ingredientId, userprofileId)
                                        values (@ingredientId, @userprofileId)";

                    DbUtils.AddParameter(cmd, "@ingredientId", ingredientId);
                    DbUtils.AddParameter(cmd, "@userprofileId", userProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUserIngredient(int ingredientId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete UserIngredient
                                        where userprofileId = @userprofileId and IngredientId = @ingredientId";
                    DbUtils.AddParameter(cmd, "@ingredientId", ingredientId);
                    DbUtils.AddParameter(cmd, "@userprofileId", userProfileId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddIngredient(Ingredient ingredient)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Insert into Ingredient (Name, IngredientTypeId, Abv)
                                        Output inserted.id
                                        values (@name, @ingredienttypeid, @abv)";
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
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Update Ingredient
                                        Set Name = @name,
                                            IngredientTypeId = @ingredienttypeid,
                                            Abv = @abv
                                    
                                        Where Id = @id";
                    DbUtils.AddParameter(cmd, "@id", ingredient.Id);
                    DbUtils.AddParameter(cmd, "@name", ingredient.Name);
                    DbUtils.AddParameter(cmd, "@ingredienttypeid", ingredient.IngredientTypeId);
                    DbUtils.AddParameter(cmd, "@abv", ingredient.Abv);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteIngredient(int ingredientId)
        {
            using (var conn = Connection)
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

        public List<Ingredient> SearchIngredients(string criterion)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  i.id, i.name, i.abv, 
                                                t.id as IngredientTypeId, t.name as IngredientName
                                                from ingredient i 
                                                left join ingredienttype t on i.IngredientTypeId = t.id
                                                where i.name like @criterion";


                    DbUtils.AddParameter(cmd, "@criterion", $"%{criterion}%");
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

        public Ingredient RandomIngredient(int ingredientTypeId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select top 1 i.id, i.name, i.abv, 
                                        t.id as IngredientTypeId, t.name as IngredientName
                                        from userIngredient uI join ingredient i on uI.ingredientId = i.id
                                        left join ingredienttype t on i.IngredientTypeId = t.id
                                        where uI.userprofileId = @userprofileId and t.id = @ingredientTypeId
                                        ORDER BY newid()";

                    DbUtils.AddParameter(cmd, "@ingredientTypeId", ingredientTypeId);
                    DbUtils.AddParameter(cmd, "@userprofileId", userProfileId);
                    var reader = cmd.ExecuteReader();
                    Ingredient ingredient = null;
                    while (reader.Read())
                    {

                        ingredient = NewIngredientFromDb(reader);

                    }

                    reader.Close();
                    return ingredient;
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
                //UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                IngredientType = new IngredientType()
                {
                    Id = DbUtils.GetInt(reader, "IngredientTypeId"),
                    Name = DbUtils.GetString(reader, "IngredientName"),
                }

            };
        }
    }
}
