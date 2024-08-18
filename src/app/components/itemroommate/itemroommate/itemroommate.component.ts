import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-itemroommate',
  templateUrl: './itemroommate.component.html',
  styleUrl: './itemroommate.component.css'
})
export class ItemroommateComponent {

  @Input() inf: any;
  @Output() itemClicked = new EventEmitter<number>();

  onItemClicked() {
    this.itemClicked.emit(this.inf.id);  
  }

  callPhoneNumber(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`, '_self');
  }

  openZaloMessage(phoneNumber: string) {
    window.open(`zalo://chat?to=${phoneNumber}`, '_self');
  }

  getFullAddress(address: any): string {
    const { province, district} = address;
    return `${district} - ${province}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
  }
}
