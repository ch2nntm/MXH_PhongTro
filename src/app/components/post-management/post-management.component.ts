import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post/post';
import { PostsService } from '../../services/post/posts.service';
import { ManagePostService } from '../../services/manage-post/manage-post.service';
import { TokenStoreService } from '../../services/token-store/token-store.service';
import { response } from 'express';
import { AccountUserService } from '../../services/account-user/account-user.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrl: './post-management.component.css'
})
export class PostManagementComponent implements OnInit{
  quantityAll=0;
  quantityActive=0;
  quantityBan=0;
  posts: Post[] = [];
  user: any;
  content: any;

  items = [
    { label: 'Hoạt động', status: 'active' },
    { label: 'Bị cấm', status: 'ban' }
  ];

  filteredPosts = this.posts;
  selectedItem = this.items[0];
  

  OnSelect(item: any): void {
    this.selectedItem = item;
  }

  searchId='';
  itemClick='active';
  selectedCount=0;

  SearchID(item: any): void {
    const searchKeyword = item.trim().toLowerCase();
    this.postService.SearchPost({ SearchName: searchKeyword }).subscribe(
      (response: Post[]) => {
        this.posts = response.filter(post =>
          post.title.toLowerCase().includes(searchKeyword)
        );
        console.log("Status: ",this.itemClick);
        if (this.itemClick === 'active') {
          this.posts = this.posts.filter(post => post.status === 'active');
        }
        else{
          this.posts = this.posts.filter(post => post.status !== 'active');
        }
        console.log('Filtered posts:', this.posts);
      },
      error => console.error('Error:', error)
    );
  }

  updateQuantities(): void {
    this.quantityActive = this.posts.filter(post => post.status === 'active').length;
    this.quantityBan = this.posts.filter(post => post.status !== 'active').length;
    this.quantityAll = this.posts.length;

    this.items = [
        { label: 'Hoạt động (' + this.quantityActive + ')', status: 'active' },
        { label: 'Bị cấm (' + this.quantityBan + ')', status: 'ban' }
    ];
    this.selectedItem = this.items[0];
  }

  ItemStatus(item: any) {
    this.selectedItem = item;
    //this.ListPosts(item.status);
    this.itemClick=item.status;
  }

  constructor(private postService: PostsService, private manage_post: ManagePostService, 
            private _account_user: AccountUserService) {}

  ListPosts(statust: string): void {
    this.manage_post.getPost().subscribe(
      response => {
        this.posts=response;
        console.log(response);
        this.updateQuantities();
        if (statust === 'active') {
          this.posts = this.posts.filter(post => post.status === 'active');
        }
        else if(statust !== 'active'){
          this.posts = this.posts.filter(post => post.status !== 'active');
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  GetFullAddress(address: any): string {
    const { province, district, ward, detail } = address;
    return `${district} - ${province}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
  }


  isMenuExpanded = false;

  ToggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  ngOnInit(): void {
    //this.ListPosts('active');
    // const token = this.token.getUser();
    // if(token.roles ==="admin"){
    //   this.manage_post.getPost1().subscribe(
    //     response => {
    //       this.posts=response;
    //  } );
    // }

    
    // this._account_user.getPost().subscribe(
    //   (response => {
    //     this.content=response;
    //     console.log("Content1: ",response);
    //     console.log("Content2: ",this.content);
    //   })
    // )

    this.manage_post.getPost1().subscribe(
      (response => {
        if(response.status == "ok"){
          this.user=response;
        }
        else{
          console.log("Unsuccessful");
        }
      })
    )
  }

  ChangeToBan(item: any){}

  ChangeToActive(item: any){}

  // Delete(item: number) {
  //   const confirmed = window.confirm('Bạn có chắc chắn muốn xoá bài đăng này không?');
  //   if(confirmed){
  //     const index = this.posts.findIndex(post => post.id === item);
  //     if (index !== -1) {
  //         this.posts.splice(index, 1);
  //     }
  //     this.updateQuantities();
  //   }
  // }

  // DeleteAll() {
  //   const confirmed = window.confirm('Bạn có chắc chắn muốn xoá những bài đăng này không?');
  //   if(confirmed){
  //     for (let i = this.posts.length - 1; i >= 0; i--) {
  //       if (this.posts[i].checked) {
  //           this.posts.splice(i, 1);
  //       }
  //     }
  //     this.Quantity();
  //   }
  // }
}
