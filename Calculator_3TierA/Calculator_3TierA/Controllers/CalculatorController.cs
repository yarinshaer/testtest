using AutoMapper;
using BLL.implementation;
using BLL.Model;
using Calculator_3TierA.Repository;
using Calculator_3TierA.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Calculation.Api.implementation;

namespace Calculator_3TierA.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class CalculatorController : ControllerBase
    {
        private readonly IMapper _mapper;
        private BLL.CalculatorBLL _BLL;
        
        public CalculatorController(IMapper mapper)
        {
            _mapper = mapper;
            _BLL = new BLL.CalculatorBLL();
        }

        //[Route("GetAll")]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CalculatorModel>>> GetAll()
        {
            var calculations = await _BLL.ListAllAsync();

            var calculationDtos = _mapper.Map<IReadOnlyList<Calculator>, IReadOnlyList<CalculatorModel>>(calculations);

            return Ok(calculationDtos);
        }
        //[Route("GetById")]
        // GET api/<CalculatorController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CalculatorModel>> GetDetails(int id)
        {
            var calculation = await _BLL.GetByIdAsync(id);

            if (calculation == null)
            {
                return NotFound();
            }

            var calculationDto = _mapper.Map<Calculator, CalculatorModel>(calculation);

            return Ok(calculationDto);
        }

        //[Route("PostCalculation")]
        // POST api/<CalculatorController>
        [HttpPost]
        public async Task<ActionResult<CalculatorModel>> PostCalculation([FromBody] CalculatorModel calculatorDto)
        {

            var result = Sum(calculatorDto.Num1, calculatorDto.Num2, calculatorDto.Sign);
            calculatorDto.Sum = result;

            var calculator = _mapper.Map<CalculatorModel, Calculator>(calculatorDto);

            _BLL.Add(calculator);
            var effected = await _BLL.SaveAsync();
            if (effected > 0) return Ok(calculator);
            return BadRequest("Saved Failed");
        }
        //[Route("PutCalculation")]
        // PUT api/<CalculatorController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<CalculatorModel>> PutCalculation(int id, [FromBody]CalculatorModel calculatorDto)
        {
            if (id != calculatorDto.Id)
            {
                return BadRequest();
            }

            var result = Sum(calculatorDto.Num1, calculatorDto.Num2, calculatorDto.Sign);
            calculatorDto.Sum = result;

            var calculator = _mapper.Map<CalculatorModel, Calculator>(calculatorDto);

            _BLL.Update(calculator);
            var effected = await _BLL.SaveAsync();
            if (effected > 0) return Ok(calculator);
            return BadRequest("Saved Failed");
        }

        //[Route("Delete")]
        // DELETE api/<CalculatorController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var calculation = await _BLL.GetByIdAsync(id);
            if (calculation == null)
            {
                return NotFound();
            }

            _BLL.Delete(calculation);
            var effected = await _BLL.SaveAsync();
            if (effected > 0) return NoContent();
            return BadRequest("Delete Failed");
        }


        #region Private Method

        private float Sum(float num1, float num2, string sign)
        {
            float sum = 0;

            if (sign == "+")
            {
                Addition add = new Addition();
                sum = add.calculate(num1, num2);
            }
            else if (sign == "-")
            {
                Subtraction sub = new Subtraction();
                sum = sub.calculate(num1, num2);
            }else if (sign == "*")
            {
                Multiplication mul = new Multiplication();
                sum = mul.calculate(num1, num2);
            }else if (sign == "/")
            {
                Division div = new Division();
                sum = div.calculate(num1, num2);
            }

            return sum;

        }

        #endregion

    }
}
