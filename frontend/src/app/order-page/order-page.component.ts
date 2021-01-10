import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterialModal, MaterialService } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { OrderPosition } from '../shared/interfaces';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderS: OrderService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.isAddingItem = !!this.route.snapshot.firstChild.params['id']
    })
  }

  openCart(): void {
    this.orderModal.open()
  }

  closeCart(): void {
    this.orderModal.close()
  }

  confirmOrder(): void {
    this.orderModal.close()
  }

  ngAfterViewInit(): void {
    this.orderModal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.orderModal.destroy()
  }

  removePosition(item: OrderPosition) {
    this.orderS.remove(item)
  }
}
