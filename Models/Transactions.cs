using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RetailBank.Models
{
	public class Transactions
	{

		[Key]
		[Required]
		public int ws_trans_id { get; set; }

		[Required]
		//[ForeignKey("ws_cust_id")]
		//[RegularExpression("([0 - 9]{9})")]
		public int ws_cust_id { get; set; }

		//[Required]
		////[ForeignKey("ws_acct_id")]
		//[RegularExpression("([0 - 9]{9})")]
		//public int ws_acct_id { get; set; }



		[ForeignKey("ws_acct_type")]
		[Required]
		[RegularExpression("([1-2]{1})")]
		public int ws_acct_type { get; set; }

		[Required]
		//[RegularExpression("([0 - 9]{10})")]
		[DataType(DataType.Currency)]
		public double ws_amt { get; set; }


		[Required]
		[RegularExpression("([1-2]{1})")]
		public int ws_tgt_typ { get; set; }
        [ForeignKey("ws_cust_id")]
        public virtual Customer Customer { get; set; }
  //      [ForeignKey("ws_acct_id")]
		//public virtual Account Account { get; set; }

	}
}
