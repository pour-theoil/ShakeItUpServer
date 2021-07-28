using Microsoft.Extensions.Configuration;
using ShakeitServer.Models;
using ShakeitServer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public class SeasonRepository : BaseRepository, ISeasonRepository
    {
        public SeasonRepository(IConfiguration configuration) : base(configuration) { }
        public List<Season> GetSeasons()
        {
            
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"select * from Season";


                        var reader = cmd.ExecuteReader();
                        var seasons = new List<Season>();
                        while (reader.Read())
                        {
                            var season = new Season()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                            seasons.Add(season);
                        }
                        reader.Close();
                        return seasons;
                    }
                }
            
        }
    }
}
