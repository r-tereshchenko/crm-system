import { Injectable } from '@angular/core';

import { OrderPosition, Position } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  public cart: OrderPosition[] = []
  public totalPrice = 0

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const candidate = this.cart.find((p,idx) => p._id === position._id)

    candidate ? candidate.quantity += position.quantity : this.cart.push(orderPosition)
    this.computePrice()
  }

  private computePrice() {
    this.totalPrice = this.cart.reduce((acc, item) => {
      return acc += item.cost * item.quantity
    }, 0)
  }

  remove(position: OrderPosition) {
    this.cart = this.cart.filter(p => p._id !== position._id)
    this.computePrice()
  }

  clear() {}
}
