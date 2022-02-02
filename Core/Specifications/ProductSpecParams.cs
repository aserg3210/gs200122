using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 60;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;
        private string _search;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        public string Search
        {
            get  
            {
                //System.Diagnostics.Debug.WriteLine(_search);// - диагностирована ошибка в 
                //ProductsWithTypesAndBrandsSpecification и ProductWithFiltersForCountSpecification
                //при передаче параметра в base связана с переводом в нижний регистр - не находит искомое
                //если в БД есть имена с буквами в верхнем регистре 
                return _search;
            }
            set => _search = value;//.ToLower() И здесь
        }
    }
}
