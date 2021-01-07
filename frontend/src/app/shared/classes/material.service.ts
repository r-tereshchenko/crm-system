import { ElementRef } from '@angular/core';

declare var M

export interface MaterialModal {
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialService {
  static toast(message: string, duration: number = 4000) {
    M.toast({
      html: message,
      displayLength: duration
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
