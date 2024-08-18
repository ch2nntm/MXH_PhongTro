import { Component } from '@angular/core';
import { ManagePostService } from '../../services/manage-post/manage-post.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  items = [
    { label: 'Tất cả', status: 'all' },
    { label: 'Hoạt động', status: 'active' },
    { label: 'Bị khoá', status: 'block' }
  ];

  posts=[
    {
      id: '382',
      avt: 'Avatar.png',
      name: 'Trần Thị Hà',
      phone: '0839473827',
      address: 'Quy Nhon',
      gmail: 'HaTran@gmail.com',
      role: 'user',
      status: 'active',
    },
    {
      id: '386',
      avt: 'profile.png',
      name: 'Trần Thị Thu',
      phone: '0839473899',
      address: 'Quận Gò Vấp, Thành phố Hồ Chí Minh',
      gmail: 'ThuTran21@gmail.com',
      role: 'client',
      status: 'active',
    },
    {
      id: '939',
      avt: 'inf_register.png',
      name: 'Lê Huỳnh',
      phone: '0839473275',
      address: 'Quận Gò Vấp, Thành phố Hồ Chí Minh',
      gmail: 'HuynhLe00@gmail.com',
      role: 'client',
      status: 'block',
    },
    {
      id: '493',
      avt: 'profile.png',
      name: 'Trần Thị Thu',
      phone: '0839473899',
      address: 'Quận Gò Vấp, Thành phố Hồ Chí Minh',
      gmail: 'ThuTran21@gmail.com',
      role: 'client',
      status: 'block',
    }
  ]

  filteredPosts = this.posts;
  selectedItem = this.items[0];
  selectedCount=0;
  itemClick='all';
  searchId='';
  quantityAll=0;
  quantityActive=0;
  quantityBlock=0;

  FilterItems(item: any): void {
    this.selectedItem = item;
    this.filteredPosts = this.posts;
    if (item.status === 'active') {
      this.filteredPosts = this.posts.filter(post => post.status === 'active');
    } else if (item.status === 'block') {
      this.filteredPosts = this.posts.filter(post => post.status === 'block');
    }
  }

  Quantity(){
    this.quantityAll=0;
    this.quantityActive=0;
    this.quantityBlock=0;
    for(var i=0; i<this.posts.length; i++){
      if(this.posts[i].status=='active'){
        this.quantityActive+=1;
        this.quantityAll+=1;
      }
      else{
        this.quantityAll+=1;
        this.quantityBlock+=1;
      }
    }
    this.items=[
      { label: 'Tất cả'+ '(' + this.quantityAll + ')', status: 'all' },
      { label: 'Hoạt động'+ '(' + this.quantityActive + ')', status: 'active' },
      { label: 'Bị cấm'+ '(' + this.quantityBlock + ')', status: 'block' }
    ];

    this.selectedItem=this.items[0];
  }

  constructor(private _manage_user: ManagePostService){
    this.Quantity();
  }

  isMenuExpanded = false;

  ToggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  ChangeStatus(item: string){
    const index = this.posts.findIndex(post => post.id === item);
    if (index !== -1) {
      if(this.posts[index].status=='active')
        this.posts[index].status='block';
      else
        this.posts[index].status='active';
    }
    this.Quantity();
  }

  getUserDetails(userId: string) {
    this._manage_user.Call_API_ManageUser()
    .subscribe((userDetails: any) => {
      console.log(userDetails);
    });
  }
  
}
