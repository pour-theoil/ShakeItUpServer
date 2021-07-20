using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface IMenuRepository
    {
        public List<Menu> GetAllMenus();
        public Menu GetMenuById(int id);
        public void AddMenu(Menu menu);
        public void UpdateMenu(Menu menu);
        public void DeleteMenu(int menuId);
    }
}
