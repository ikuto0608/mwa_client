import { Component, Input, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'app/components/shares/confirm_modal.component.html',
  styleUrls: ['app/components/shares/confirm_modal.component.css'],
})
export class ConfirmModalComponent {
  @ViewChild('confirmModal') confirmModal: ElementRef
  @Input() contentHash: any

  private title: string
  private message: string

  constructor() {
    let contentHash = this.contentHash || {}
    this.title = contentHash.title || "Confirm"
    this.message = contentHash.message || "Do you want to execute it?"
  }
}
