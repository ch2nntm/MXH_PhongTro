import { Component, OnInit } from '@angular/core';
import { map, max } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../../models/post/post';
import { PostsService } from '../../services/post/posts.service';
import { Router } from '@angular/router';
import e from 'express';
import { AccountUserService } from '../../services/account-user/account-user.service';

interface Location {
  Id: string;
  Name: string;
  Districts?: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards?: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

@Component({
  selector: 'app-roommate-search',
  templateUrl: './roommate-search.component.html',
  styleUrl: './roommate-search.component.css'
})
export class RoommateSearchComponent {
  Array_Price = [
    { min: 0, max: 500000000, label: 'Tất cả giá thành'},
    { min: 0, max: 1000000, label: 'Dưới 1 triệu' },
    { min: 1000000, max: 2000000, label: '1 triệu - 2 triệu đồng' },
    { min: 2000000, max: 3000000, label: '2 triệu - 3 triệu đồng' },
    { min: 3000000, max: 5000000, label: '3 triệu - 5 triệu đồng' },
    { min: 5000000, max: 7000000, label: '5 triệu - 7 triệu đồng' },
    { min: 7000000, max: 10000000, label: '7 triệu - 10 triệu đồng' },
    { min: 10000000, max: 50000000, label: 'Từ 10 triệu trở lên' }
  ];

  Array_Acreage = [
    { min: 0, max: 20, label: 'Dưới 20m2'},
    { min: 20, max: 30, label: 'Từ 20m2 - 30m2' },
    { min: 30, max: 50, label: 'Từ 30m2 - 50m2' },
    { min: 50, max: 70, label: 'Từ 50m2 - 70m2' },
    { min: 70, max: 100, label: 'Từ 70m2 - 100m2' },
    { min: 100, max: 1000, label: 'Từ 100m2 trở lên' }
  ];

  infs: Post[] = [];
  startPrice=this.Array_Price[0].min;
  endPrice=this.Array_Price[this.Array_Price.length-1].max;
  startAcreage=this.Array_Acreage[0].min;
  endAcreage=this.Array_Acreage[this.Array_Acreage.length-1].max;
  selectedCategory: string = '';
  searchCategory: string='Tất cả';
  isClickSearch: boolean=false;
  isClickBtnKind: boolean=false;
  isClickBtnAddress: boolean=false;
  isClickBtnAcreage: boolean=false;
  isClickBtnPrice: boolean=false;
  isClickBtnFilter: boolean=false;
  activeItem: string | null = null;

  private apiUrl = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';

  constructor(private http: HttpClient, private postService: PostsService, 
    private router: Router, private _user: AccountUserService) {
    // this.ListPosts();
    // console.log("End: ",this.Array_Acreage[this.Array_Acreage.length-1].max);
  }

  content:any;
  ngOnInit(): void {
    this.FetchCities();
    this.ListPosts();
    // this._user.getPost().subscribe(
    //   (response => {
    //     this.content=response;
    //     console.log("Content1: ",response);
    //     console.log("Content2: ",this.content);
    //   })
    // )
  }

  ToggleArrow(item: string) {
    if (this.activeItem === item) {
      this.activeItem = null;
    } else {
      this.activeItem = item;
    }
    this.isClickBtnKind = (this.activeItem === 'kind');
    this.isClickBtnAddress = (this.activeItem === 'address');
    this.isClickBtnAcreage = (this.activeItem === 'acreage');
    this.isClickBtnPrice = (this.activeItem === 'price');
  }

  ResetAll(){
    this.cityName='';
    this.districtName='';
    this.wardName='';
    this.selectedCity='';
    this.selectedDistrict='';
    this.selectedWard='';
    this.startAcreage=0;
    this.endAcreage=this.Array_Acreage[this.Array_Acreage.length-1].max;
    this.startPrice=0;
    this.endPrice=this.Array_Price[this.Array_Price.length-1].max;
    this.ListPosts();
  }

  SetAllPrice(){
    this.startPrice=0;
    this.endPrice=50000000;
  }

  SetPriceRange(start: number, end: number) {
    this.startPrice = start;
    this.endPrice = end;
  }

  SetAcreageRange(start: number, end: number) {
    this.startAcreage = start;
    this.endAcreage = end;
  }

  CallPhoneNumber(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`, '_self');
  }

  OpenZaloMessage(phoneNumber: string) {
    window.open(`zalo://chat?to=${phoneNumber}`, '_self');
  }

  GetFullAddress(address: any): string {
    const { province, district, ward, detail } = address;
    return `${district} - ${province}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
  }

  FetchCities(): void {
    this.http.get<Location[]>(this.apiUrl).subscribe(data => {
      this.cities = data;
    });
  }

  OnCityChange(event: any): void {
    this.selectedCity = event.target.value;
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.districts = [];
    if (this.selectedCity) {
      const selectedCity = this.cities.find(city => city.Id === this.selectedCity);
      this.cityName=selectedCity?.Name ?? '';
      if (this.cityName.startsWith('Tỉnh ')) {
        this.cityName =  this.cityName.replace('Tỉnh ', '');
      } else if (this.cityName.startsWith('Thành phố ')) {
        this.cityName = this.cityName.replace('Thành phố ', '');
      }
      this.region=this.cityName;
      this.cityName=this.removeVietnameseTones(this.cityName);
      if (selectedCity) {
        this.districts = selectedCity.Districts || [];
      }
    }
  }

  OnDistrictChange(event: any): void {
    this.selectedDistrict = event.target.value;
    this.selectedWard = '';
    this.wards = [];
    if (this.selectedDistrict) {
      const selectedCity = this.cities.find(city => city.Id === this.selectedCity);
      if (selectedCity) {
        const selectedDistrict = selectedCity.Districts?.find(district => district.Id === this.selectedDistrict);
        this.districtName=selectedDistrict?.Name ?? '';
        if (this.districtName.startsWith('Huyện ')) {
          this.districtName =  this.districtName.replace('Huyện ', '');
        } else if (this.districtName.startsWith('Thành phố ')) {
          this.districtName = this.districtName.replace('Thành phố ', '');
        } else if (this.districtName.startsWith('Thị xã ')) {
          this.districtName = this.districtName.replace('Thị xã ', '');
        }
        this.region=this.districtName+' - '+this.region;
        this.districtName=this.removeVietnameseTones(this.districtName);
        if (selectedDistrict) {
          this.wards = selectedDistrict.Wards || [];
        }
      } 
    }
  }

  cities: Location[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  selectedCity: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';
  cityName: string='';
  districtName: string='';
  wardName: string='';
  region:string='';

  ListPosts(): void {
    let params = new HttpParams();
    params = params.set('CategoryName','chung');
    const queryParams = params.toString();
    this.postService.Call_API_Search_Post(params).subscribe(
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
  
  

  ResetAddress(){
    this.selectedCity = '';
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.districts=[];
    this.wards=[];
  }

  removeVietnameseTones(str: string): string {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D')
              .replace(/[^a-zA-Z0-9 ]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
  }

  cityNameMap: { [id: number]: string } = {};
  SearchAll(){
    let params = new HttpParams();
    if (this.startAcreage != 0) {
      params = params.set('ArceFrom', this.startAcreage.toString());
    }
    else{
        params = params.set('ArceFrom','0');
    }
    if (this.endAcreage != 0) {
        params = params.set('ArceTo', this.endAcreage.toString());
    }
    if (this.startPrice != 0) {
        params = params.set('from', this.startPrice.toString());
    }
    else{
        params = params.set('from','0');
    }
    if (this.endPrice != 0) {
        params = params.set('to', this.endPrice.toString());
    }
    if (this.districtName != '') {
      params = params.set('Address', this.districtName);
    }
    else if(this.cityName != '')
      params = params.set('Address', this.removeVietnameseTones(this.cityName));
    params = params.set('CategoryName','chung');

    const queryParams = params.toString();
    this.postService.Call_API_Search_Post(queryParams).subscribe(
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

  NavigateToDetail(itemId: any): void {
    this.router.navigate(['/detailroommate', itemId]);
  }
    
}
