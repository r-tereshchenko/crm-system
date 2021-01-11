import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PositionService } from '../../shared/services/position.service';
import { OrderStorageService } from '../order-storage.service';
import { Position } from '../../shared/interfaces';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(
    private route: ActivatedRoute,
    private positionsS: PositionService,
    private orderS: OrderStorageService
  ) { }

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params) => {
        return this.positionsS.getPositionsByCategoryId(params['id'])
      }),
      map((positions: Position[]) => {
        return positions.map(p => {
          p.quantity = 1
          return p
        })
      })
    )
  }

  addToCart(position: Position): void {
    this.orderS.add(position)
    MaterialService.toast(
      `${position.name}: x${position.quantity} - has been added to your shopping cart`,
      {status: 'success'}
    )
  }
}
