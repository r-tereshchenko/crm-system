import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { MaterialTooltip, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { DatePickerFilter, Order } from '../shared/interfaces';

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

  filter: DatePickerFilter = {}
  loadMoreSTEP = 2
  queryOptions = {
    offset: 0,
    limit: this.loadMoreSTEP
  }

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
    const params = Object.assign({}, this.filter, this.queryOptions)
    this.getOrdersSub = this.ordersS.getOrders(params).subscribe(
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
    this.queryOptions.offset += this.loadMoreSTEP
    this.getOrders()
  }

  triggerFilter() {
    this.isFilterVisible = !this.isFilterVisible
    this.tooltip.close()
    this.tooltip.options.html = this.isFilterVisible ? 'Close filter' : 'Open Filter'
  }

  applyFilter(filter: DatePickerFilter) {
    this.orders = []
    this.queryOptions.offset = 0
    this.filter = filter
    this.isReloading = true
    this.getOrders()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
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
