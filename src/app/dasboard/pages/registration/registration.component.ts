import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { Rol, UserRegister } from '../../interface/UserResgister';
import { TravelService } from '../../service/travel.service';
import { Vehicle } from '../../interface/UserResgister';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  
})
export class RegistrationComponent implements OnInit {
  rol: Rol = {
    id:0,
    name:'',
    isDeleted:0
}
vehicle:Vehicle={
    id:0,
    name:'',
    isDeleted:0
}
user: UserRegister = {
 
    email:'',
    password:'',
    fullName:'',
    address:'',
    cellPhone:'',
    isAccepted:true,
    isDeleted:false,
    observation:'',
    vehicle:this.vehicle,
    rol: this.rol
  
};
  constructor(private travelService:TravelService ) {}
 
 
  ngOnInit(): void {}
 
  sendData(formDirective:FormGroupDirective) {
  
  let idVehicle:number=0
  let idUser=0
 
  if(this.profileForm.controls['vehicle'].value === 'Bicicleta'){
    idVehicle=1
    
  }else if(this.profileForm.controls['vehicle'].value === 'Motocicleta'){
    idVehicle=2
    
  }else if(this.profileForm.controls['vehicle'].value === 'Automóvil'){
    idVehicle=3
    
  }
  
  if(this.profileForm.controls['rol'].value ==='cadete'){
    idUser=2
  
  }else if(this.profileForm.controls['rol'].value ==='cliente'){
    idUser=3
   
  }

  this.rol= {
    id:idUser,
    name:this.profileForm.controls['rol'].value,
    isDeleted:0
}
this.vehicle={
    id:idVehicle,
    name:this.profileForm.controls['vehicle'].value,
    isDeleted:0
}

  this.user={
    email: this.profileForm.controls['email'].value,
    password:this.profileForm.controls['password'].value,
    fullName:this.profileForm.controls['fullName'].value,
    address:this.profileForm.controls['address'].value,
    cellPhone:this.profileForm.controls['cellPhone'].value,
    isAccepted:true,
    isDeleted:false,
    observation:'ninguna',
    vehicle:this.vehicle,
    rol:this.rol
  
  }
  
    this.travelService.createUser(this.user).subscribe(respuesta => {
      console.log(respuesta)
      Swal.fire({
        position: 'center',
        title: '¡Resgistro Exitoso!',
        text: 'Pulse para continuar',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      formDirective.resetForm()
  },error=>{
    if(error.error = 'Usuario ya existe'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Usuario ya existe ',
      })
    }
  });
}


 rolValue:string='cliente'
 isCadet:boolean=false

 onChange(event:MatRadioChange){
 this.rolValue=event.value

 if(this.rolValue==='cadete'){
   this.isCadet=true
 }else{
  this.isCadet=false
 }
 
 }



  // uso validators para hacer las validaciones del formulario 
  profileForm = new FormGroup({

    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    address: new FormControl('', [Validators.required]),
    cellPhone: new FormControl('', [Validators.required]),
    rol: new FormControl('cliente', [Validators.required]),
    vehicle:new FormControl('0')
  });
   
 



}
