using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BLL.Model
{
    public class CalculatorModel
    {
     
        public int Id { get; set; }
        [Required]
        [RegularExpression(@"^[0-9]*(?:\.[0-9]+)?$",ErrorMessage ="the number 1 is not valid")]
        public float Num1 { get; set; }
        [Required]
        [RegularExpression(@"^[0-9]*(?:\.[0-9]+)?$", ErrorMessage = "the number 2 is not valid")]
        public float Num2 { get; set; }
        public float Sum { get; set; }
        [Required]
        [StringLength(1)]
        public string Sign { get; set; }
    }
}
