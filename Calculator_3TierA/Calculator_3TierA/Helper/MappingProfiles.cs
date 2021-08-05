using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Model;
using Calculator_3TierA.Repository.Models;

namespace Web_API.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CalculatorModel, Calculator>().ReverseMap();
        }
    }
}
