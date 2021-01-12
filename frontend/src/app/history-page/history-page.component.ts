import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { MaterialTooltip, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Order } from '../shared/interfaces';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialTooltip

  orders: Order[] = []
  isFilterVisible = false
  isLoading = false
  isReloading = false
  noMoreOrders = false

  queryOptions = {
    offset: 0,
    limit: 2
  }
  loadMoreSTEP = 1

  // Subscriptions
  getOrdersSub: Subscription

  constructor(
    private ordersS: OrdersService
  ) { }

  ngOnInit(): void {
    this.isReloading = true
    this.getOrders()
  }

  private getOrders() {
    this.getOrdersSub = this.ordersS.getOrders(this.queryOptions).subscribe(
      (orders) => {
        this.orders = this.orders.concat(orders)
        this.isLoading = false
        this.isReloading = false
        this.noMoreOrders = orders.length < this.loadMoreSTEP
      },
      () => {
        this.isLoading = false
        this.isReloading = false
      }
    )
  }

  loadMore() {
    this.isLoading = true
    this.queryOptions.offset += this.loadMoreSTEP + 1
    this.getOrders()
  }

  triggerFilter() {
    this.isFilterVisible = !this.isFilterVisible
    this.tooltip.close()
    this.tooltip.options.html = this.isFilterVisible ? 'Close filter' : 'Open Filter'
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(
      this.tooltipRef,
      {html: this.isFilterVisible ? 'Close filter' : 'Open Filter'}
    )
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    if (this.getOrdersSub) {
      this.getOrdersSub.unsubscribe()
      this.getOrdersSub = null
    }
  }
}
