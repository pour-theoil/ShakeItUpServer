using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface ISeasonRepository
    {
        List<Season> GetSeasons();
    }
}
