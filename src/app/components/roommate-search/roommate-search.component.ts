import { Component, OnInit } from '@angular/core';
import { map, max } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../../models/post/post';
import { PostsService } from '../../services/post/posts.service';
import { Router } from '@angular/router';
import e, { response } from 'express';
import { AccountUserService } from '../../services/account-user/account-user.service';

interface Location {
  Id: string;
  Name: string;
  Districts?: District[];
}

interface District {
  Id: string;
  Name: string;
}


@Component({
  selector: 'app-roommate-search',
  templateUrl: './roommate-search.component.html',
  styleUrl: './roommate-search.component.css'
})
export class RoommateSearchComponent {
  array_price = [
    { min: 0, max: 500000000, label: 'Tất cả giá thành'},
    { min: 0, max: 1000000, label: 'Dưới 1 triệu' },
    { min: 1000000, max: 2000000, label: '1 triệu - 2 triệu đồng' },
    { min: 2000000, max: 3000000, label: '2 triệu - 3 triệu đồng' },
    { min: 3000000, max: 5000000, label: '3 triệu - 5 triệu đồng' },
    { min: 5000000, max: 7000000, label: '5 triệu - 7 triệu đồng' },
    { min: 7000000, max: 10000000, label: '7 triệu - 10 triệu đồng' },
    { min: 10000000, max: 50000000, label: 'Từ 10 triệu trở lên' }
  ];

  array_acreage = [
    { min: 0, max: 20, label: 'Dưới 20m2'},
    { min: 20, max: 30, label: 'Từ 20m2 - 30m2' },
    { min: 30, max: 50, label: 'Từ 30m2 - 50m2' },
    { min: 50, max: 70, label: 'Từ 50m2 - 70m2' },
    { min: 70, max: 100, label: 'Từ 70m2 - 100m2' },
    { min: 100, max: 1000, label: 'Từ 100m2 trở lên' }
  ];

  infs: Post[] = [];
  start_price=this.array_price[0].min;
  end_price=this.array_price[this.array_price.length-1].max;
  start_acreage=this.array_acreage[0].min;
  end_acreage=this.array_acreage[this.array_acreage.length-1].max;
  is_click_btn_address: boolean=false;
  is_click_btn_acreage: boolean=false;
  is_click_btn_price: boolean=false;
  active_item: string | null = null;
  cities: Location[] = [];
  districts: District[] = [];
  selected_city: string = '';
  selected_district: string = '';
  city_name: string='';
  district_name: string='';
  region:string='';

  constructor(private _http: HttpClient, private _postService: PostsService, 
    private _router: Router, private _user: AccountUserService) {
  }

  content:any;
  ngOnInit(): void {
    this.fetchCities();
    this.listPosts();
    this._user.get_Post().subscribe({
      next: (response: { contents: Post[] }) => {
        console.log("Content: ", response.contents);
        // Xử lý dữ liệu nhận được từ API ở đây
        this.content = response.contents;
      },
      error: (error) => {
        console.error("Error fetching posts:", error);
        // Xử lý lỗi ở đây
      }
    });
  }

  toggleArrow(item: string) {
    if (this.active_item === item) {
      this.active_item = null;
    } else {
      this.active_item = item;
    }
    this.is_click_btn_address = (this.active_item === 'address');
    this.is_click_btn_acreage = (this.active_item === 'acreage');
    this.is_click_btn_price = (this.active_item === 'price');
  }

  resetAll(){
    this.city_name='';
    this.district_name='';
    this.selected_city='';
    this.selected_district='';
    this.start_acreage=0;
    this.end_acreage=this.array_acreage[this.array_acreage.length-1].max;
    this.start_price=0;
    this.end_price=this.array_price[this.array_price.length-1].max;
    this.listPosts();
  }

  setAllPrice(){
    this.start_price=0;
    this.end_price=50000000;
  }

  setPriceRange(start: number, end: number) {
    this.start_price = start;
    this.end_price = end;
  }

  setAcreageRange(start: number, end: number) {
    this.start_acreage = start;
    this.end_acreage = end;
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

  fetchCities(): void {
    this._http.get<Location[]>('public/data.json').subscribe({
      next: (data) => {
        this.cities = data;
        console.log("City: ", this.cities);
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
      }
    });
  }
  

  onCityChange(event: any): void {
    this.selected_city = event.target.value;
    this.selected_district = '';
    this.districts = [];
    if (this.selected_city) {
      const city = this.cities.find(city => city.Id === this.selected_city);
      this.city_name=city?.Name ?? '';
      if (this.city_name.startsWith('Tỉnh ')) {
        this.city_name =  this.city_name.replace('Tỉnh ', '');
      } else if (this.city_name.startsWith('Thành phố ')) {
        this.city_name = this.city_name.replace('Thành phố ', '');
      }
      this.region=this.city_name;
      this.city_name=this.removeVietnameseTones(this.city_name);
      if (city) {
        this.districts = city.Districts || [];
      }
    }
  }

  onDistrictChange(event: any): void {
    this.selected_district = event.target.value;
    if (this.selected_district) {
      const selected_city = this.cities.find(city => city.Id === this.selected_city);
      if (selected_city) {
        const selected_district = selected_city.Districts?.find(district => district.Id === this.selected_district);
        this.district_name=selected_district?.Name ?? '';
        if (this.district_name.startsWith('Huyện ')) {
          this.district_name =  this.district_name.replace('Huyện ', '');
        } else if (this.district_name.startsWith('Thành phố ')) {
          this.district_name = this.district_name.replace('Thành phố ', '');
        } else if (this.district_name.startsWith('Thị xã ')) {
          this.district_name = this.district_name.replace('Thị xã ', '');
        }
        this.region=this.district_name+' - '+this.region;
        this.district_name=this.removeVietnameseTones(this.district_name);
      } 
    }
  }

  listPosts(): void {
    let params = new HttpParams();
    params = params.set('CategoryName','chung');
    const queryParams = params.toString();
    this._postService.Call_API_Search_Post(params).subscribe(
      (response: { results: Post[] }) => { 
        this.infs = response.results;
        console.log("Request Body: ", queryParams); 
        console.log("All Response: ", this.infs); 
      },
      error => {
        console.error('Error:', error); 
      }
    );
  }

  removeVietnameseTones(str: string): string {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D')
              .replace(/[^a-zA-Z0-9 ]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
  }

  searchAll(){
    let params = new HttpParams();
    if (this.start_acreage != 0) {
      params = params.set('ArceFrom', this.start_acreage.toString());
    }
    else{
        params = params.set('ArceFrom','0');
    }
    if (this.end_acreage != 0) {
        params = params.set('ArceTo', this.end_acreage.toString());
    }
    if (this.start_price != 0) {
        params = params.set('from', this.start_price.toString());
    }
    else{
        params = params.set('from','0');
    }
    if (this.end_price != 0) {
        params = params.set('to', this.end_price.toString());
    }
    if (this.district_name != '') {
      params = params.set('Address', this.district_name);
    }
    else if(this.city_name != '')
      params = params.set('Address', this.removeVietnameseTones(this.city_name));
    params = params.set('CategoryName','chung');
    
    const queryParams = params.toString();
    this._postService.Call_API_Search_Post(queryParams).subscribe(
      (response: { results: Post[] }) => { 
        this.infs = response.results;
        console.log("Params: ",queryParams);
        console.log("All Response: ",response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  navigateToDetail(itemId: any): void {
    this._router.navigate(['/detailroommate', itemId]);
  }
    
}
