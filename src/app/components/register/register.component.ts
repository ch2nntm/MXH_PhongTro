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
  isLoggedIn: boolean=false;
  isEmail: boolean=false;
  isPassword: boolean=false;
  isPhone: boolean=false;
  isAddress: boolean=false;
  isName: boolean=false;
  email: string='';
  password: string='';
  phone: string='';
  address='';
  name: string='';

  isEmailLogin=false;
  isPasswordLogin=false;
  emaillogin='';
  passwordlogin='';

  registerForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private _auth: AuthserviceService,
     private _login: LoginService, private _api_post: PostsService,
      private _router: Router, private _token: TokenStoreService){}

  OnFocusEmail(){
    this.isEmail = true;
  }
  OnFocusEmailLogin(){
    this.isEmailLogin = true;
  }
  OnFocusPassword(){
    this.isPassword = true;
  }
  OnFocusPasswordLogin(){
    this.isPasswordLogin = true;
  }
  OnFocusPhone(){
    this.isPhone = true;
  }
  OnFocusAddress(){
    this.isAddress = true;
  }
  OnFocusName(){
    this.isName = true;
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
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  emailLoginFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordLoginFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  hide = true; // Hide password

  ToggleHide() {
    this.hide = !this.hide;
  }

  ngOnInit(): void {}
  user = {
    name: '',
    email: '',
    phone: '',
    address_user: '',
    password: '',
    roles: ''
  };

  OnSubmit(): void {
    if (this.emaillogin === '' || this.passwordlogin === '') {
      alert('Vui lòng điền đầy đủ các trường');
    } else {
      this._auth.login({ email: this.emaillogin, password: this.passwordlogin })
        .subscribe(
          (actor) => {
            console.log("Actor: "+actor.roles);
            let user={
              roles : actor.roles,
              name: actor.name,
              email: actor.email,
              phone: actor.phone,
              address_user: actor.address_user,
              password: actor.password,
            }

            if (actor.roles == 'user') {
              this._router.navigate(['/uiuser'], { queryParams: { name: actor.name } }); // Điều hướng tới trang User
              this.isLoggedIn=true;
            } else if (actor.roles == 'admin') {
              console.log("Token admin: "+this._token.getToken());
              this._router.navigate(['/uiadmin']); 
              this.isLoggedIn=true;
            } else {
              alert(actor.user.role);
            }
          },
          (error) => {
            console.error('Lỗi đăng nhập:', error);
            alert('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
          }
        );
      }
  }
  
  
  OnRegister(): void {
    if (this.user.name!='' && this.user.email!='' && this.user.address_user!=''
        && this.user.password!='' && this.user.phone!='') {
      this._api_post.Register_User(this.user).subscribe(
        (response: any) => {
          alert('Register successful');
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
