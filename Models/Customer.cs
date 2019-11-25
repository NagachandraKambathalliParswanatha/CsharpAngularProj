using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RetailBank.Models
{
	public class Customer
	{
		[Key]
		[Required]
		public int ws_cust_id { get; set; }

		[Required]
		[RegularExpression("([0-9]{9})")]
		public int ws_ssn { get; set; }


		[Required]
		[RegularExpression("([A-Za-z\\s]{1,20})", ErrorMessage = "Cannot contain numbers or special characters")]
		public string ws_name { get; set; }


		[Required]
		[RegularExpression("^[a-zA-Z0-9]{4,10}$", ErrorMessage = "Cannot contain special characters")]
		public string ws_adrs { get; set; }


		[Required]
		[RegularExpression("([0-9]{1,3})")]
		public int ws_age { get; set; }

	}
}
