using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
