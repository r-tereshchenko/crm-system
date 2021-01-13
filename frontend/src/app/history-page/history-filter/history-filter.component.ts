import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

import { DatePickerFilter } from '../../shared/interfaces';
import { MaterialDatePicker, MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {

  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef
  @Output() onFilter = new EventEmitter<DatePickerFilter>()

  order: number
  datePickerStart: MaterialDatePicker
  datePickerEnd: MaterialDatePicker

  isValid = true

  submitFilter() {
    const filter: DatePickerFilter = {}


    console.log('FILTER: ', filter)
    if (this.order) {
      filter.order = this.order
    }

    if (this.datePickerStart.date) {
      filter.start = this.datePickerStart.date
    }

    if (this.datePickerEnd.date) {
      filter.end = this.datePickerEnd.date
    }
    this.onFilter.emit(filter)
  }

  validateDate() {
    if (!this.datePickerStart.date || !this.datePickerEnd.date) {
      this.isValid = true
      return
    }

    this.isValid = this.datePickerStart < this.datePickerEnd
    if (!this.isValid) {
      MaterialService.toast(`Invalid date picked. End date cannot be prior or equal to start date`, {status: 'warning'})
      // this.datePickerEnd.gotoDate(new Date(this.datePickerStart.date))
      const date = new Date(this.datePickerStart.date)
      date.setDate(date.getDate() + 1)
      this.datePickerEnd.setDate(date)
    }
  }

  ngAfterViewInit(): void {
    console.log('start: ', this.startRef)
    this.datePickerStart = MaterialService.initDatePicker(this.startRef, this.validateDate.bind(this))
    this.datePickerEnd = MaterialService.initDatePicker(this.endRef, this.validateDate.bind(this))
  }

  ngOnDestroy(): void {
      this.datePickerStart.destroy()
  }
}
