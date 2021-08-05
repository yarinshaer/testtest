using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace Calculator_3TierA.Repository.Models
{
    public class Calculator
    {
     
        public int Id { get; set; }
        public float Num1 { get; set; }
        public float Num2 { get; set; }
        public float Sum { get; set; }
        [Required]
        [StringLength(1)]
        public string Sign { get; set; }
    }
}
