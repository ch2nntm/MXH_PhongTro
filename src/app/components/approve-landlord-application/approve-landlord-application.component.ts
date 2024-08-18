import { Component } from '@angular/core';
import { ManagePostService } from '../../services/manage-post/manage-post.service';
import { UserVerifyService } from '../../services/user-verify/user-verify.service';

@Component({
  selector: 'app-approve-landlord-application',
  templateUrl: './approve-landlord-application.component.html',
  styleUrl: './approve-landlord-application.component.css'
})
export class ApproveLandlordApplicationComponent {
  isRefuse=false;
  isClickItem=false;
  images=[];
  quatityImg=0;

  infs=[
    {
      id: '483',
      phone: '0939483923',
      name: 'Trần Thị Hà',
      address_user: 'Quy Nhơn',
      email: 'HaTran@gmail.com',
      date: '03/03/2022',
      avt: 'Avatar.png',
      cccd: 'Ellipse.png, profile.png'
    },
    {
      id: '433',
      phone: '0939483453',
      name: 'Huỳnh Hoàng',
      address_user: 'Quy Nhơn',
      email: 'Huynh@gmail.com',
      date: '12/05/2023',
      avt: 'Ellipse.png',
      cccd: ''
    },
    {
      id: '394',
      phone: '0448483453',
      name: 'Nguyễn Lanh',
      address_user: 'Tuy Phước',
      email: 'Lanh394@gmail.com',
      date: '04/09/2022',
      avt: 'Ellipse.png',
      cccd: 'Avatar.png, Ellipse.png, profile.png, inf_register.png'
    }
  ]

  infChild={
    id:'',
    phone: '',
    name: '',
    address_user: '',
    email: '',
    date: '',
    avt: '',
    cccd: ''
  }
  http: any;
 
  constructor(private _manage_user: ManagePostService, private _manage_verify_user: UserVerifyService){}

  DetailInf(item: any):void{
    this.infChild = item;
    this.isClickItem=true;
    this.quatityImg=0;
    if(item.cccd){
      this.images=item.cccd.split(', ');
    }
    else{
      this.images=[];
    }
    for(var i=0; i<this.images.length; i++){
      this.quatityImg+=1;
    }
    console.log(this.images);
    this.isRefuse=false;
  }

  ChangeImg() {
    if (this.images.length > 0) {
      let firstImage = this.images[0]; 
      this.images.shift();
      this.images.push(firstImage); // Add it to the end of the array
    }
  }

  BtnRefuse(){
    this.isRefuse=!this.isRefuse;
  }

  RefuseItem(item: string){
    const index = this.infs.findIndex(inf => inf.id === item);
    if (index !== -1) {
        this.infs.splice(index, 1);
    }
    this.DetailInf('');
  }

  CloseDetail(){
    this.isClickItem=false;
  }

  getVerificationDetails() {
    this._manage_verify_user.Call_API_ManageUser()
    .subscribe((response: any) => {
      const userId = response.id; 
      this.getUserDetails(userId);
    });
  }

  getUserDetails(userId: string) {
    this._manage_user.Call_API_ManageUserID(userId)
    .subscribe((userDetails: any) => {
      console.log(userDetails);
      this.infs = userDetails;
    });
  }
  
}
