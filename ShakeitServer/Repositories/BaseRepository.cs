using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ShakeitServer.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string _connectionString;
        

        //Use this BaseRepo Config for RDS Storarge
        public BaseRepository(IConfiguration configuration)
        {
            var builder = new SqlConnectionStringBuilder(configuration.GetConnectionString("AwsRdsConnection"));
            builder.UserID = configuration["DbUser"];
            builder.Password = configuration["DbPassword"];

            _connectionString = builder.ConnectionString;
        }

        //Use this BaseRepo Config for Local Development

        //public BaseRepository(IConfiguration configuration)
        //{
        //    _connectionString = configuration.GetConnectionString("DefaultConnection");
        //}


        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}