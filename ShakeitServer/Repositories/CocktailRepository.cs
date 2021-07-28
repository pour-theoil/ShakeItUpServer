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

        public List<Cocktail> GetAllCocktails()
        {
            throw new NotImplementedException();
        }

        public Cocktail GetCocktailById(int id)
        {
            throw new NotImplementedException();
        }

        public int NumCocktails(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select count(id) as NumCocktails from cocktailIngredient;";

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
    }
}
