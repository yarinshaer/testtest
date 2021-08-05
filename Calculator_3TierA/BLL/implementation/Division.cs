using BLL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.implementation
{
    public class Division : ICalculators
    {
        public float calculate(float num1, float num2)
        {
            return num1 / num2;
        }
    }
}
