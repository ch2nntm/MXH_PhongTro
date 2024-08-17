import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { TokenStoreService } from '../../services/token-store/token-store.service';
import { AuthserviceService } from '../../services/auth/authservice.service';

@Component({
  selector: 'app-uiuser',
  templateUrl: './uiuser.component.html',
  styleUrl: './uiuser.component.css'
})
export class UIUserComponent implements OnInit{
  title = 'VD_material';
  // startPrice=0;
  // endPrice=50000000;
  // startAcreage=0;
  // endAcreage=150;
  // selectedTypeHome: string = '';
  // searchTypeHome: string='Tất cả';
  // isClickSearch: boolean=false;
  // isClickBtnKind: boolean=false;
  // isClickBtnAddress: boolean=false;
  // isClickBtnAcreage: boolean=false;
  // isClickBtnPrice: boolean=false;
  // isClickBtnFilter: boolean=false;
  // activeItem: string | null = null;
  name: string='';

  constructor(private route: ActivatedRoute, private _router:Router,
    private _login: LoginService, private _token: TokenStoreService,
    private _auth: AuthserviceService){}

  ngOnInit(): void {
    var namefull='';
    this.route.queryParams.subscribe(params => {
      namefull = params['name'];
    });
    this.name = namefull;
  }

  LogOut(): void {
    // this.name = ''; 
    this._auth.logout();
    this._router.navigate(['/']); // Chuyển hướng đến trang đăng ký
  }

  // ToggleArrowKind(item: string) {
  //   const button = document.getElementById('dropdownMenuButton1');
  //   this.activeItem = this.activeItem === item ? null : item;
  //   if (button) {
  //     button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  //     this.isClickBtnKind=!this.isClickBtnKind;
  //   }
  // }

  // ToggleArrowAddress(item: string) {
  //   const button = document.getElementById('dropdownMenuButton2');
  //   this.activeItem = this.activeItem === item ? null : item;
  //   if (button) {
  //     button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  //     this.isClickBtnAddress=!this.isClickBtnAddress;
  //   }
  // }

  // ToggleArrowAcreage(item: string) {
  //   const button = document.getElementById('dropdownMenuButton3');
  //   this.activeItem = this.activeItem === item ? null : item;
  //   if (button) {
  //     button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  //     this.isClickBtnAcreage=!this.isClickBtnAcreage;
  //   }
  // }

  // ToggleArrowPrice(item: string) {
  //   const button = document.getElementById('dropdownMenuButton4');
  //   this.activeItem = this.activeItem === item ? null : item;
  //   if (button) {
  //     button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  //     this.isClickBtnPrice=!this.isClickBtnPrice;
  //   }
  // }

  // ToggleArrowFilter(item: string) {
  //   const button = document.getElementById('dropdownMenuButton5');
  //   this.activeItem = this.activeItem === item ? null : item;
  //   if (button) {
  //     button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  //     this.isClickBtnFilter=!this.isClickBtnFilter;
  //   }
  // }

  // UpdateTypeHome(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.selectedTypeHome = inputElement.value;
  // }

  // SearchTypeHome(event: Event){
  //   this.searchTypeHome=this.selectedTypeHome;
  //   this.isClickSearch = true;
  // }

  // ResetTypeHome(){
  //   this.searchTypeHome='Tất cả';
  // }

  // SetAllPrice(){
  //   this.startPrice=0;
  //   this.endPrice=50000000;
  // }

  // SetPriceRange(start: number, end: number) {
  //   this.startPrice = start;
  //   this.endPrice = end;
  // }

  // SetAllAcreage(){
  //   this.startAcreage=0;
  //   this.endAcreage=150;
  // }

  // SetAcreageRange(start: number, end: number) {
  //   this.startAcreage = start;
  //   this.endAcreage = end;
  // }

  // isMenuExpanded = false;
  // ToggleMenu() {
  //   this.isMenuExpanded = !this.isMenuExpanded;
  // }

  namePage='';
  clickPage=false;
  GetLinkContent(event: Event) {
    const target = event.target as HTMLElement;
    this.namePage = target.textContent?.trim() || '';
    this.clickPage=true;
  }

}
