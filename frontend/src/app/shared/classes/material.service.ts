import { ElementRef } from '@angular/core';

declare var M

export class MaterialService {
  static toast(message: string) {
    M.toast({
      html: message
    })
  }

  static initializeFloatingButton(elemRef: ElementRef) {
    M.FloatingActionButton.init(elemRef.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }
}
