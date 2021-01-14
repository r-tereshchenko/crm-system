import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { OrderPosition, Position } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class OrderStorageService {
  public cart: OrderPosition[] = []
  public totalPrice = 0

  public isOrderConfirmed = new Subject<boolean>()

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const candidate = this.cart.find(
      (p) => p._id === position._id
    )

    candidate ? candidate.quantity += position.quantity : this.cart.push(orderPosition)
    this.computePrice()
  }

  private computePrice(): void {
    this.totalPrice = this.cart.reduce((total, item) => {
      return total += item.cost * item.quantity
    }, 0)
  }

  remove(position: OrderPosition) {
    this.cart = this.cart.filter(p => p._id !== position._id)
    this.computePrice()
  }

  clear() {
    this.cart = []
    this.totalPrice = 0
  }
}
