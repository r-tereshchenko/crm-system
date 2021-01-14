import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
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
export class OrderPositionsComponent implements OnInit, OnDestroy {

  positions: Position[] = []
  isLoading = false

  //Subscriptions
  positionsSub: Subscription
  isOrderConfirmedSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private positionsS: PositionService,
    private orderS: OrderStorageService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.positionsSub = this.route.params.pipe(
      switchMap((params) => {
        return this.positionsS.getPositionsByCategoryId(params['id'])
      }),
      map((positions: Position[]) => {
        return positions.map(p => {
          p.quantity = 1
          return p
        })
      })
    ).subscribe(
      (positions) => {
        this.positions = positions
        this.isLoading = false
      },
      error => {
        console.log('Error: ', error)
        MaterialService.toast(error?.message, {status: 'danger'})
        this.isLoading = false
      })

    this.isOrderConfirmedSub = this.orderS.isOrderConfirmed
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.positions.map((position) => {
            position.quantity = 1
            return position
          })
        }
      })
  }

  addToCart(position: Position): void {
    this.orderS.add(position)
    MaterialService.toast(
      `${position.name}: x${position.quantity} - has been added to your shopping cart`,
      {status: 'success'}
    )
  }

  ngOnDestroy(): void {
    if (this.positionsSub) {
      this.positionsSub.unsubscribe()
      this.positionsSub = null
    }
    if (this.isOrderConfirmedSub) {
      this.isOrderConfirmedSub.unsubscribe()
      this.isOrderConfirmedSub = null
    }
  }
}
