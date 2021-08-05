using Calculation.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interface;

namespace Calculation.Api.implementation
{
    public class Subtraction : ICalculators
    {
        
        public float calculate(float num1, float num2)
        {
            return num1 - num2;
        }
    }
}
