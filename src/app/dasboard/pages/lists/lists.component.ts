import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import {  UserRegister} from '../../interface/UserResgister';
import { TravelService } from '../../service/travel.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  selected:string='option1'
  isloading:boolean=true
  closeResult:string=''
  show:boolean=false
 // usersFinal:UserRegister[]=[]
  usersAdmin:UserRegister[]=[]
  usersCadet:UserRegister[]=[]
  usersAll:UserRegister[]=[]
  usersNoconfirm:UserRegister[]=[]

  constructor(private travelService:TravelService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getUsers(3)
  }
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  displayedColumns: string[] = ['nombre','rol','direccion','telefono','email','vehicle','acciones'];
  dataSource = new MatTableDataSource();

  capturar() {
   
    
    if(this.selected === 'option1'){
     this.isloading=true
     this.show=false
     this.dataSource.data=[]
     this.getUsers(3)
     
   
    }else if(this.selected === 'option2'){
     this.isloading=true
     this.show=false
     this.dataSource.data=[]
     this.getUsers(2)
    }else if(this.selected === 'option3'){
    
     this.isloading=true
     this.show=false
     this.dataSource.data=[]
     this.getUsers(1)
    
   }else if(this.selected === 'option4'){
    
    this.isloading=true
    this.show=false
    this.dataSource.data=[]
    this.getUsers(-1)
   
  }else if(this.selected === 'option5'){
    this.isloading=true
    this.show=true
    this.dataSource.data=[]
    this.getUsers(3,false)
  }
 }


getUsers(idRolToFind:number,isAccepted:boolean=true){
  if(idRolToFind === -1){
    this.travelService.getUsers().subscribe(data =>{
      this.usersAll= data.filter(user=> user.isAccepted === isAccepted && user.isDeleted=== false);
     this.dataSource.data= this.usersAll;
     this.isloading=false
   })
  }else{
    this.travelService.getUsers().subscribe(data =>{
      this.usersAll= data.filter(user => user.rol?.id === idRolToFind && user.isAccepted === isAccepted  && user.isDeleted=== false);
      this.dataSource.data=  this.usersAll;
      this.isloading=false
   })
  
  }
}

userModificar:UserRegister[]=[]

saveChanges(titleOperation:string) {
  
 
  this.travelService.createUser(this.userModificar[0]).subscribe(respuesta => {
      console.log(respuesta)
      Swal.fire({
        title: titleOperation,
        text: 'Pulse para continuar',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.capturar()
  },error=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.error}`,

    })
  });
}
//funcion para aparecer y deaprecer el select de vehiculo
isCadet:boolean=false
rolValue:string='cliente'

 onChange(event:MatRadioChange){
 this.rolValue=event.value
 
 if(this.rolValue==='cadete'){
   this.isCadet=true
 }else{
  this.isCadet=false
 }

 }


 
 deleteUser(idUsertoDelete:number){
  this.findUser(idUsertoDelete);
  this.userModificar[0].isDeleted=true;
  this.saveChanges('¡Eliminado con exito!')

 }
 confirmUser(idUsertoConfirm:number){
  this.findUser(idUsertoConfirm);
  this.userModificar[0].isAccepted=true;
  this.saveChanges('¡Usuario confirmado con exito!')

 }

//busca al usuario a modificar
findUser(idUserToFind:number){
  this.userModificar= this.usersAll.filter(user => user.id === idUserToFind);
}


 
//abre el modal
open(content:any,idUser:number) {
  this.findUser(idUser);
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
//cierre de modal
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
getUserNotConfirmed(){
  this.travelService.getUsers().subscribe(data =>{
    this.dataSource.data= data.filter(user => user.isAccepted === false)
    this.isloading=false
  
  })
}
}

