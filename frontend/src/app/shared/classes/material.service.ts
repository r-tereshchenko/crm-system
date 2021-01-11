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
}
