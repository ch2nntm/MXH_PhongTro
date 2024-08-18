import { Component } from '@angular/core';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {
  like: boolean=false;
  no="public/heart_border_black.png";
  yes="public/heart_blue.png";
  images = [];
  img_main=this.images[0];
  currentImageIndex = 0;

  ngOnInit(): void {
  }

  changeImg() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.img_main = this.images[this.currentImageIndex];
  }

  share() {
    const shareUrl = 'https://example.com'; 
    window.open(shareUrl, '_blank');
  }

  isLike(){
    this.like=!this.like;
  }

  callPhoneNumber(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`, '_self');
  }

  openZaloMessage(phoneNumber: string) {
    window.open(`zalo://chat?to=${phoneNumber}`, '_self');
  }
}
