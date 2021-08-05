using BLL.Interface;
using Calculation.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.implementation
{
    public class Multiplication : ICalculators
    {
        public float calculate(float num1, float num2)
        {
            return num1 * num2;
        }
    }
}
