import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  shopParams: ShopParams;
  //shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    {name: 'По алфавиту', value: 'name'},
    {name: 'Цена: по возрастанию', value: 'priceAsc'},
    {name: 'Цена: по убыванию', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
   }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false){
    this.shopService.getProducts(useCache).subscribe({
      next: (response) => {
        this.products = response.data;
        // this.shopParams.pageNumber = response.pageIndex;
        // this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        //console.dir(response);
      },
      error: (e) => console.log(e)
    });
  }
  getBrands(){
    this.shopService.getBrands().subscribe({
     next: (response) => this.brands = [{id: 0, name: 'All'}, ...response],
     error: (e) => console.log(e)
    });
  }
  getTypes(){
    this.shopService.getTypes().subscribe({
      next: (response) => this.productTypes = [{id: 0, name: 'All'}, ...response],
      error: (e) => console.log(e)
    });
  }
  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber != event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }

  }
  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    //console.dir(this.searchTerm);
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onReset(){

    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
