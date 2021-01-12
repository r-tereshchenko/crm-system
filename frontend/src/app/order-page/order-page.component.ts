import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { MaterialModal, MaterialService } from '../shared/classes/material.service';
import { OrderStorageService } from './order-storage.service';
import { Order, OrderPosition } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  // providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('orderModal') modalRef: ElementRef
  orderModal: MaterialModal
  isAddingItem: boolean
  isPending = false

  // Subscriptions
  createOrderSub: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderStorageS: OrderStorageService,
    private ordersS: OrdersService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.isAddingItem = !!this.route.snapshot.firstChild.params['id']
    })
  }

  openCart(): void {
    this.orderModal.open()
  }

  closeCart(): void {
    this.orderModal.close()
  }

  removePosition(item: OrderPosition) {
    this.orderStorageS.remove(item)
  }

  confirmOrder(): void {
    this.isPending = true
    const order: Order = {
      list: this.orderStorageS.cart.map((item => {
        delete item._id
        return item
      }))
    }

    this.createOrderSub = this.ordersS.createOrder(order).subscribe(
      (newOrder) => {
        MaterialService.toast(`Order №${newOrder.order} has been successfully confirmed.`, {status: 'success'})
        this.orderStorageS.clear()
      },
      (error) => {
        MaterialService.toast(error.error.message, {status: 'danger'})
      },
      () => {
        this.orderModal.close()
        this.isPending = false
      }
    )
  }

  ngAfterViewInit(): void {
    this.orderModal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.orderModal.destroy()
    if (this.createOrderSub) {
      this.createOrderSub.unsubscribe()
      this.createOrderSub = null
    }
  }
}
