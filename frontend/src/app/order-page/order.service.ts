import { Injectable } from '@angular/core';

import { Position } from '../shared/interfaces';

@Injectable()

export class OrderService {
  public cart: Position[] = []

  add(position: Position) {
    this.cart.push(position)
  }

  remove() {}

  clear() {}
}
