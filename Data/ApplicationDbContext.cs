using Microsoft.EntityFrameworkCore;
using RetailBank.Models;

namespace RetailBank
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}
		public DbSet<Customer> Customer { get; set; }

		public DbSet<Account> Account { get; set; }
		
		public DbSet<Transactions> Transactions { get; set; }

	}
}