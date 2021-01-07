import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { PositionService } from '../../../shared/services/position.service';
import { Position } from '../../../shared/interfaces';
import { MaterialModal, MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef
  @Input('categoryId') categoryId: string
  positions: Position[] = []
  isLoading = false
  modal: MaterialModal

  constructor(
    private positionS: PositionService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.positionS.getPositionsByCategoryId(this.categoryId).subscribe(
      positions => {
        this.positions = positions
        this.isLoading = false
      },
      error => {
        this.isLoading = false
      }
      )
  }

  selectPosition(position: Position) {
    this.modal.open()
  }

  addPosition() {
    this.modal.open()

  }

  closeSelectingPosition() {
    this.modal.close()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }
}
