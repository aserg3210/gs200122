using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
        : base(x =>
            //x.Name.ToLower и productParams.Search.ToLower() исп только с латиницей.
            //В sqlServer возможно использ UTF-8. В sqlLite НЕТ!!!
            (string.IsNullOrEmpty(productParams.Search) || x.Name.Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {

        }
    }
}
