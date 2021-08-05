using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Calculator_3TierA.Repository.Models;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Calculator_3TierA.Repository
{
    public class CalculateDbContext : DbContext
    {


        public CalculateDbContext() : base(GetOptions("Data Source=localhost\\SQLEXPRESS;Initial Catalog=Calculate;Integrated Security=True"))
        {
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }


        public virtual DbSet<Calculator> Calculator { get; set; }

    }
}
