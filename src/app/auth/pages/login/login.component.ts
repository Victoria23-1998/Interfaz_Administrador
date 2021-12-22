import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { User } from '../../interface/localS';
import { UserResponse } from '../../interface/userResponse';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 user:User={
    id:0,
    email:'',
    fullName: '',
    address:'',
    cellPhone:''
 }
  constructor(private loginService:LoginService, private router:Router, private authService:AuthService  ) { }
  
    ngOnInit(): void {}
  
    hide = true;
   
    Login = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  

  
    onSubmit(){
      const email = this.Login.controls['email'].value;
      const password =  this.Login.controls['password'].value;
      
       this.loginService.Login(email,password).subscribe((data:UserResponse)=>{
         if(data.rol.id === 1){
          this.user.id= data.id;
          this.user.email= data.email;
          this.user.fullName= data.fullName;
          this.user.address=data.address;
          this.user.cellPhone=data.cellPhone;

          this.authService.login(this.user)
          this.router.navigate(['/dasboard/registro']);
         }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No eres un usuario autorizado',
           
          })
         }
      },(error =>{
        if(error.error == 'Usuario no existe'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario inexistente',
          })
        }
      }))
        
    }
   
   
    
  
  }

