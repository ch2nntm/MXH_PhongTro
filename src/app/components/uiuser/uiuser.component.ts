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
  name: string='';

  constructor(private _route: ActivatedRoute, private _router:Router,
    private _login: LoginService, private _token: TokenStoreService,
    private _auth: AuthserviceService){}

  ngOnInit(): void {
    var namefull='';
    this._route.queryParams.subscribe(params => {
      namefull = params['name'];
    });
    this.name = namefull;
  }

  logOut(): void {
    this._auth.logout();
    this._router.navigate(['/']); 
  }

}
