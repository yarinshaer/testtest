using Calculator_3TierA.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Microsoft.EntityFrameworkCore;

namespace BLL
{
    public class CalculatorBLL
    {
        private CalculatorDAL<Calculator> _DAL = new CalculatorDAL<Calculator>();
        

        public async Task<Calculator> GetByIdAsync(int id)
        {
            return await _DAL.GetByIdAsync(id);
        }

        public async Task<IReadOnlyList<Calculator>> ListAllAsync()
        {
            return await _DAL.ListAllAsync();
        }

        public void Add(Calculator entity)
        {
            _DAL.Add(entity);
        }

        public void Update(Calculator entity)
        {
            _DAL.Update(entity);
        }

        public void Delete(Calculator entity)
        {
            _DAL.Delete(entity);
        }

        public async Task<int> SaveAsync()
        {
            return await _DAL.SaveAsync();
        }
    }
}
