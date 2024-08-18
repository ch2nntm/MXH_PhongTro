import {Component, OnInit} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { RegisterService } from '../../services/register/register.service';
import { PostsService } from '../../services/post/posts.service';
import { AuthserviceService } from '../../services/auth/authservice.service';
import { TokenStoreService } from '../../services/token-store/token-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit{
  is_logged_in: boolean=false;
  is_email: boolean=false;
  is_password: boolean=false;
  is_phone: boolean=false;
  is_address: boolean=false;
  is_name: boolean=false;
  email: string='';
  password: string='';
  phone: string='';
  address='';
  name: string='';

  is_email_login=false;
  is_password_login=false;
  emaillogin='';
  passwordlogin='';

  constructor(private _auth: AuthserviceService,
     private _login: LoginService, private _api_post: PostsService,
      private _router: Router, private _token: TokenStoreService){}

  onFocusEmail(){
    this.is_email = true;
  }
  onFocusEmailLogin(){
    this.is_email_login = true;
  }
  onFocusPassword(){
    this.is_password = true;
  }
  onFocusPasswordLogin(){
    this.is_password_login = true;
  }
  onFocusPhone(){
    this.is_phone = true;
  }
  onFocusAddress(){
    this.is_address = true;
  }
  onFocusName(){
    this.is_name = true;
  }

  ngAfterViewInit (): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });
  }
  
  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  phone_form_control = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  address_form_control = new FormControl('', [Validators.required, Validators.minLength(5)]);
  name_form_control = new FormControl('', [Validators.required, Validators.minLength(10)]);
  password_form_control = new FormControl('', [Validators.required, Validators.minLength(6)]);
  email_login_form_control = new FormControl('', [Validators.required, Validators.email]);
  password_login_form_control = new FormControl('', [Validators.required, Validators.minLength(6)]);

  ngOnInit(): void {}
  user = {
    name: '',
    email: '',
    phone: '',
    address_user: '',
    password: '',
    roles: ''
  };

  onSubmitLogin(): void {
    if (this.emaillogin === '' || this.passwordlogin === '') {
      alert('Please fill in all fields!');
    } else {
      this._auth.login({ email: this.emaillogin, password: this.passwordlogin })
        .subscribe(
          (actor) => {
            console.log("Actor: "+actor.roles);
            if (actor.roles == 'user' || actor.roles == 'customer') {
              this._router.navigate(['/uiuser'], { queryParams: { name: actor.name } }); 
              this.is_logged_in=true;
            } else if (actor.roles == 'admin') {
              console.log("Token admin: "+this._token.getToken());
              this._router.navigate(['/uiadmin']); 
              this.is_logged_in=true;
            } else {
              alert(actor.user.role);
            }
          },
          (error) => {
            console.error('Login error:', error);
            alert('Login failed. Please check your information and try again.');
          }
        );
      }
  }
  
  onSubmitRegister(): void {
    if (this.user.name!='' && this.user.email!='' && this.user.address_user!=''
        && this.user.password!='' && this.user.phone!='') {
      this._api_post.Register_User(this.user).subscribe(
        (response: any) => {
          alert('Register successful');
          this._router.navigate(['/']);
        },
        (error: any) => {
          console.error('Register error', error);
        }
      );
    } else {
      alert('Form is invalid');
    }
  }
  
  
}
