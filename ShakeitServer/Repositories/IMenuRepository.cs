using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface IMenuRepository
    {
        public List<Menu> GetAllMenus(int id);
        public Menu GetMenuById(int id, int userId);
        public void AddMenu(Menu menu);
        public void UpdateMenu(Menu menu);
        public void DeleteMenu(int menuId);
    }
}
