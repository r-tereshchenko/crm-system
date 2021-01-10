import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

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

  modalForm: FormGroup
  positions: Position[] = []
  positionId = null
  isLoading = false
  modal: MaterialModal

  constructor(
    private positionS: PositionService
  ) { }

  ngOnInit(): void {
    this.modalForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ])
    })
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

  // Getter for name control
  get positionName(): AbstractControl {
    return this.modalForm.get('name')
  }

  // Getter for cost control
  get positionCost(): AbstractControl {
    return this.modalForm.get('cost')
  }

  deletePosition(event: Event, position: Position): void {
    event.stopPropagation()
    const decision = window.confirm(`Are you sure you want to remove "${position.name}" position?`)

    if (decision) {
      this.positionS.deletePosition(position).subscribe(
        response => {
          const positionIndex = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(positionIndex, 1)
          MaterialService.toast(response.message, {class: 'success'})
        },
        error => {
          MaterialService.toast(error.error.message, {class: 'danger'})
        }
      )
    }
  }

  submitForm(): void {
    this.modalForm.disable()

    const newPosition: Position = {
      ...this.modalForm.value,
      category: this.categoryId
    }

    const completed = (): void => {
      this.closeSelectingPosition()
      this.modalForm.reset()
      this.modalForm.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionS.updatePosition(newPosition).subscribe(
        (position) => {
          const index = this.positions.findIndex(p => p._id === position._id)
          this.positions[index] = position
          MaterialService.toast('Position has been updated', {class: 'success'})
        },
        error => MaterialService.toast(error.error.message, {class: 'danger'}),
        completed
      )
    } else {
      this.positionS.createPosition(newPosition).subscribe(
        (position) => {
          this.positions.push(position)
          MaterialService.toast('Position has been created', {class: 'success'})
        },
        error => MaterialService.toast(error.error.message, {class: 'danger'}),
        completed
      )
    }

  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  // Methods for actions with position modal
  editPosition(position: Position) {
    console.log('TADA!')
    this.positionId = position._id
    this.modal.open()
    this.modalForm.patchValue({
      name: position.name,
      cost: position.cost
    })
    MaterialService.updateTextInputs()
  }

  addPosition() {
    this.positionId = null
    this.modalForm.reset()
    this.modal.open()

  }

  closeSelectingPosition() {
    this.modal.close()
  }
}
