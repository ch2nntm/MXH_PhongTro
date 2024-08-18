import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post/post';
import { PostsService } from '../../services/post/posts.service';
import { ManagePostService } from '../../services/manage-post/manage-post.service';
import { TokenStoreService } from '../../services/token-store/token-store.service';
import { response } from 'express';
import { AccountUserService } from '../../services/account-user/account-user.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrl: './post-management.component.css'
})
export class PostManagementComponent implements OnInit{
  posts: Post[] = [];
  user: any;
  search_id: any;
  currentStatus: string = 'active'; 

  constructor(private _postService: PostsService, private _manage_post: ManagePostService, 
    private _account_user: AccountUserService) {}

  ngOnInit(): void {
    this.listPosts('active');
    this._manage_post.Call_API_ManageUser().subscribe(
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


  filterStatusActive(status: string){
    this.listPosts(status);
    this.currentStatus = status;
  }

  filterStatusBan(status: string){
    this.listPosts(status);
    this.currentStatus = status;
  }

  searchID(item: any): void {
    const search_keyword = item.trim().toLowerCase();
    this._postService.Call_API_Search_Post({ SearchName: search_keyword }).subscribe(
      (response: Post[]) => {
        this.posts = response.filter(post =>
          post.title.toLowerCase().includes(search_keyword)
        );
        console.log('Filtered posts:', this.posts);
      },
      error => console.error('Error:', error)
    );
  }


  listPosts(status: string): void {
    const params = new HttpParams().set('key', 'value');
    this._postService.Call_API_Search_Post(params).subscribe(
      (response: { results: Post[] })=> {
        this.posts=response.results;
        console.log('Admin Data:', response);
        if (status === 'active') {
          this.posts = this.posts.filter(post => post.status === 'active');
        }
        else if(status !== 'active'){
          this.posts = this.posts.filter(post => post.status !== 'active');
        }
      },
      error => {
        console.error('Error:', error);
        if (error.status === 401) {
          alert('You do not have access');
        }
      }
    );
  }

  getFullAddress(address: any): string {
    const { province, district, ward, detail } = address;
    return `${district} - ${province}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
  }

  changeToBan(item: any){
    const confirmed = window.confirm('Are you sure you want to ban this post?');
    if (confirmed) {
      console.log('Change post status successfully', item);
    } else {
      console.log('The execution has been cancelled.');
    }
  }

  changeToActive(item: any){
    const confirmed = window.confirm('Are you sure you want to active this post?');
    if (confirmed) {
      console.log('Change post status successfully', item);
    } else {
      console.log('The execution has been cancelled.');
    }
  }

}
