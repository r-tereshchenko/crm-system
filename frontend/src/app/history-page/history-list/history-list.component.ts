import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { Order } from '../../shared/interfaces';
import { MaterialModal, MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {

  @ViewChild('orderModal') modalRef: ElementRef
  @Input() orders: Order[]

  modal: MaterialModal
  selectedOrder: Order = null

  computePrice(order: Order): number {
    return order.list.reduce<number>((total, item) => {
      return total += item.cost * item.quantity
    }, 0)
  }

  openOrder(order: Order): void {
    this.selectedOrder = order
    this.modal.open()
  }

  closeSelectedOrder() {
    this.modal.close()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }
}
