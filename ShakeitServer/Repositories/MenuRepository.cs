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
    public class MenuRepository : BaseRepository, IMenuRepository
    {
        public MenuRepository(IConfiguration configuration) : base(configuration) { }

        public List<Menu> GetAllMenus()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  m.id, m.name, m.datecreated, m.UserProfileId, m.notes, m.seasonId
                                                s.id as seasonId s.name as seasonName
                                                from menu m join season s on m.seasonId = s.id
                                                where i.IsDeleted = 0";
                    var reader = cmd.ExecuteReader();
                    var menus = new List<Menu>();
                    while (reader.Read())
                    {
                        menus.Add(NewMenuFromDb(reader));
                    }

                    reader.Close();

                    return menus;
                }

            }
        }

        public Menu GetMenuById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select  m.id, m.name, m.datecreated, m.UserProfileId, m.notes, m.seasonId
                                                s.id as seasonId s.name as seasonName
                                                from menu m join season s on m.seasonId = s.id
                                                join CocktailMenu cm on cm.MenuId = m.id
                                                where m.IsDeleted = 0
                                                and m.id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Menu menu = null;
                    while (reader.Read())
                    {
                        if (menu == null)
                        {
                            menu = NewMenuFromDb(reader);
                            menu.Cocktails = new List<Cocktail>();
                        }

                    }

                    reader.Close();
                    return menu;
                }

            }
        }

        public void AddMenu(Menu menu)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    menu.DateCreated = DateTime.Now;
                    cmd.CommandText = @"
                                        Insert into Menu (Name, SeasonId, Notes, UserProfileId)
                                        Output inserted.id
                                        values (@name, @seasonId, @notes, @UserProfileId)";
                   
                    DbUtils.AddParameter(cmd, "@name", menu.Name);
                    DbUtils.AddParameter(cmd, "@seasonId", menu.SeasonId);
                    DbUtils.AddParameter(cmd, "@notes", menu.Notes);
                    DbUtils.AddParameter(cmd, "@UserProfileId", menu.UserProfileId);
                    DbUtils.AddParameter(cmd, "@datecreated", menu.DateCreated);

                    menu.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateMenu(Menu menu)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Update Menu
                                        Set Name = @name,
                                            SeasonId = @seasonId,
                                            Notes = @notes,
                                            UserProfileId = @UserProfileId
                                        Where Id = @id";
                    DbUtils.AddParameter(cmd, "@id", menu.Id);
                    DbUtils.AddParameter(cmd, "@name", menu.Name);
                    DbUtils.AddParameter(cmd, "@seasonId", menu.SeasonId);
                    DbUtils.AddParameter(cmd, "@notes", menu.Notes);
                    DbUtils.AddParameter(cmd, "@UserProfileId", menu.UserProfileId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteMenu(int menuId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update Menu Set IsDeleted = 1 where Id = @id";
                    DbUtils.AddParameter(cmd, "@id", menuId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Menu NewMenuFromDb(SqlDataReader reader)
        {
            return new Menu()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                Notes = DbUtils.GetString(reader, "Notes"),
                SeasonId = DbUtils.GetInt(reader, "SeasonId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                Season = new Season()
                {
                    Id = DbUtils.GetInt(reader, "seasonId"),
                    Name = DbUtils.GetString(reader, "seasonName"),
                }

            };
        }
    }
}

