import { ElementRef } from '@angular/core';

declare var M

export interface MaterialModal {
  open?(): void
  close?(): void
  destroy?(): void
}

export interface MaterialTooltip extends MaterialModal {
  options?: {
    html?: string
    exitDelay?: number
    enterDelay?: number
    margin?: number
    inDuration?: number
    outDuration?: number
    position?: string
    transitionMovement?: number
  }
}

export interface MaterialDatePicker extends MaterialModal {
  date?: Date
  toString?(): string
  setDate?(date?: Date): void
  gotoDate?(date?: Date): void
}

export interface MaterialDatePickerOptions {
  autoClose?: boolean
  format?: string
  parse?: Function
  defaultDate?: Date
  setDefaultDate?: boolean
  disableWeekends?: boolean
  disableDayFn?: Function
  firstDay?: number
  minDate?: Date
  maxDate?: Date
  yearRange?: Number | []
  isRTL?: boolean
  showMonthAfterYear?: boolean
  showDaysInNextAndPreviousMonths?: boolean
  container?: Element
  showClearBtn?: boolean
  i18n?: Object
  events?: []
  onSelect?: Function
  onOpen?: Function
  onClose?: Function
  onDraw?: Function
}

export interface ToastOptions {
  duration?: number
  status?: toastStatus
}

export type toastStatus = 'success' | 'warning' | 'danger' | 'default'

export class MaterialService {
  static toast(message: string, options: ToastOptions = {}): void {
    M.toast({
      html: message,
      displayLength: options.duration || 4000,
      classes: `toast-${options.status}` || ''
    })
  }

  static initializeFloatingButton(elemRef: ElementRef): void {
    M.FloatingActionButton.init(elemRef.nativeElement)
  }

  static updateTextInputs(): void {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialModal {
    return M.Modal.init(ref.nativeElement)
  }

  static initTooltip(elRef: ElementRef, options = null): MaterialTooltip {
    return M.Tooltip.init(elRef.nativeElement, options);
  }

  static initDatePicker(elRef: ElementRef, onClose: () => void, options: MaterialDatePickerOptions = {}): MaterialDatePicker {
    return M.Datepicker.init(elRef.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
      ...options
    })
  }

  static initTapTarget(elRef: ElementRef, options = {}): MaterialModal {
    return M.TapTarget.init(elRef.nativeElement, options);
  }
}
