import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  constructor(private basketSrvice: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketSrvice.basket$;
  }
  removeBasketItem(item: IBasketItem) {
    this.basketSrvice.removeItemFromBasket(item);
  }
  incrementItemQuantity(item: IBasketItem) {
    this.basketSrvice.incrementItemQuantity(item);
  }
  decrementItemQuantity(item: IBasketItem) {
    this.basketSrvice.decrementItemQuantity(item);
  }
}
