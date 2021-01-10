import { ElementRef } from '@angular/core';

declare var M

export interface MaterialModal {
  open?(): void
  close?(): void
  destroy?(): void
}

export interface ToastOptions {
  duration?: number
  class?: toastStatus
}

export type toastStatus = 'success' | 'warning' | 'danger' | 'default'

export class MaterialService {
  static toast(message: string, options: ToastOptions = {}) {
    M.toast({
      html: message,
      displayLength: options.duration || 4000,
      classes: `toast-${options.class}` || ''
    })
  }

  static initializeFloatingButton(elemRef: ElementRef) {
    M.FloatingActionButton.init(elemRef.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialModal {
    return M.Modal.init(ref.nativeElement)
  }
}
