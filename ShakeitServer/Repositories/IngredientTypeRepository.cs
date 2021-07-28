using Microsoft.Extensions.Configuration;
using ShakeitServer.Models;
using ShakeitServer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ShakeitServer.Repositories
{
    public class IngredientTypeRepository : BaseRepository, IIngredientTypeRepository
    {
        public IngredientTypeRepository(IConfiguration configuration) : base(configuration) { }
        public List<IngredientType> GetIngredientTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select * from IngredientType";


                    var reader = cmd.ExecuteReader();
                    var ingredientTypes = new List<IngredientType>();
                    while (reader.Read())
                    {
                        var ingredienttype = new IngredientType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                        ingredientTypes.Add(ingredienttype);
                    }
                    reader.Close();
                    return ingredientTypes;
                }
            }
        }
    }
}
