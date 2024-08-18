import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/post/posts.service';
import { Post } from '../../models/post/post';

@Component({
  selector: 'app-roommate-search-detail',
  templateUrl: './roommate-search-detail.component.html',
  styleUrl: './roommate-search-detail.component.css'
})
export class RoommateSearchDetailComponent {
  post: Post={
    "id": 0,
    "title": 'Hi',
    "description": '',
    "acreage": 0,
    "price": 0,
    "contact": '',
    "images": '',
    "address": {
        "province": '',
        "district": '',
        "ward": '',
    },
    "category": {
        "id": 0,
        "name": '',
    },
    "status": '',
    "createDate": new Date(10/10/2022),
    "updateDate": new Date(10/10/2022),
    "user":{
        "address_user": '',
        "name": '',
        "phone": '',
    }
  };
  current_image_index = 0;
  like: boolean=false;
  no="public/heart_border_black.png";
  yes="public/heart_blue.png";
  images =  [];
  img_main='';

  constructor(private route: ActivatedRoute, private _api_post: PostsService){}
  // changeImg() {
  //   this.current_image_index = (this.current_image_index + 1) % this.images.length;
  //   this.img_main = this.images[this.current_image_index];
  // }

  // share() {
  //   const shareUrl = 'https://example.com'; 
  //   window.open(shareUrl, '_blank'); 
  // }

  // IsLike(){
  //   this.like=!this.like;
  // }

  Break() {
    var textElement = document.getElementById("des");
    var text = textElement?.innerHTML;
    var ngatDongText = text?.split('. ').join('.<br>') + '';
    if (textElement) {
      textElement.innerHTML = ngatDongText;
    }
  }

  callPhoneNumber(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`, '_self');
  }

  openZaloMessage(phoneNumber: string) {
    window.open(`zalo://chat?to=${phoneNumber}`, '_self');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.showItem(id);
    this.Break();
  }

  showItem(idItem: any){
    this._api_post.DetailPost(idItem).subscribe(
    (response: any) => { 
      this.post = response.results;
      this.img_main=this.post.images[0];
      console.log("Main: ",this.img_main);
    });
  }

  getFullAddress(address: any): string {
    const { province, district, ward, detail } = address;
    return `${district} - ${province}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
  }

  changeImgLeft() {
    if(this.post.images.length>1){
      if(this.current_image_index==0){
        this.current_image_index=this.images.length;
      }
        
      this.current_image_index = (this.current_image_index - 1) % this.images.length;
      this.img_main = this.images[this.current_image_index];
    }
  }

  changeImgRight() {
    if(this.post.images.length>1){
      this.current_image_index = (this.current_image_index + 1) % this.images.length;
      this.img_main = this.images[this.current_image_index];
    }
  }

}
