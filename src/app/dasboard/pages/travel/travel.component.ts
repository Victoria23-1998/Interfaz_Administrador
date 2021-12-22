import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TravelResponse } from '../../interface/travelResponse';
import { User } from 'src/app/auth/interface/localS';
import { TravelService } from '../../service/travel.service';
import { forkJoin} from 'rxjs';
import {UserRegister} from '../../interface/UserResgister'
import { LoaderService } from '../../service/loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
  selected = 'option2';
  select = 'option1';
  tipoGestion:string='-1';
  localStorage:User={} as User;
  userId:number= 0;
  arrayCadets:UserRegister[]=[];
  arrayActivos:TravelResponse[]=[];
  isloading=true;
  arraySelectedTravel:number[]=[];
 
  constructor(private travelService:TravelService, private loaderService:LoaderService) { }
 capturar() {
   //pendientes
   if(this.selected === 'option1'){
    this.isloading=true
    this.dataSource.data=[]
    this.forkJoinPendientes()
    //en curso
   }else if(this.selected === 'option3'){
    this.isloading=true
    this.dataSource.data=[]
    this.forkJoinEnCurso()
   }else if(this.selected === 'option2'){
    this.isloading=true
    this.dataSource.data=[]
    this.forkJoinActivos()
   }
  }
  
  public onChange(event:Event): void {
    this.tipoGestion=(<HTMLOptionElement>event.target).value
  }

@ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['check','id', 'cliente', 'direccion','EstadoEnvio'];
  dataSource = new MatTableDataSource();

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
ngOnInit(): void {
    this.localStorage= JSON.parse(localStorage.getItem('Usuario')|| '')
    this.userId =  this.localStorage.id as number
    this.isloading=true
    this.forkJoinActivos()
    this.getCadet()
  }
  //traer cadetes

 getCadet(){
    this.travelService.getUsers().subscribe(data =>{
      this.arrayCadets= data.filter(travel => travel.rol?.id === 2 && travel.isAccepted === true)
   })
}
//Estado del envio
  descripEstate(state:number){
    let result:string = ''

    switch (state) {
      case 1:
        result = "Pendiente-Retiro"
        break;
        case 5:
        result = "Pendiente-Entrega"
        break;
        case 2:
        result = "Retiro-Asignado"
       break;
        case 6:
        result = "Entrega-Asignada"
        break;
        case 3:
        result = "En curso"
        break;
        case 7:
        result = "En curso"
        break;
        case 8:
        result = "Entregado"
        break;
        case 4:
        result = "Entregado"
        break;
        case 10:
        result = "Cancelado"
        break;
    }
    return result
  }
 
 //viajes pendientes estado 1
 activos:TravelResponse[]=[]
 //
actualizar(){
  
  if(this.selected === 'option1'){
    this.isloading=true
    this.dataSource.data=[]
    this.forkJoinPendientes()
    //en curso
   }else if(this.selected === 'option3'){
    this.isloading=true
    this.dataSource.data=[]
    this.forkJoinEnCurso()
   }else if(this.selected === 'option2'){
    this.isloading=true
    this.dataSource.data=[]
    this.forkJoinActivos()
  }
}
idCliente:number=0;
resigned:boolean=false;
statusTravel:number=0
seleccion:string=''
idCadetSeleted:string='-1'
//detecta el cambi del select de cadetes
changeCadet(event:Event){
  this.idCadetSeleted= (<HTMLOptionElement>event.target).value
}
getNewStatus(statusCurrent:number){
  let newStatus:number=0
   //ver a que estado cambia luego de cancelar
   switch (statusCurrent) {
    case 1:
      newStatus = 1
      break;
    case 5:
      newStatus = 5
      break;
    case 2:
      newStatus = 1
      break;
    case 6:
      newStatus = 5
      break;
    case 3:
      newStatus = 2
      break;
    case 7:
      newStatus = 6
      break;
    default:
      break;
  }
  return newStatus
}

selectedTravel(idTravelSeleted:number){
  
  let index= this.arraySelectedTravel.indexOf(idTravelSeleted )
  if(index >=0){
    
    this.arraySelectedTravel.splice(index, 1)
  }else{
    this.arraySelectedTravel.push(idTravelSeleted)
  }
 
  
}

//cambiar estado
  async changeStatus(){
    if(this.arraySelectedTravel.length===0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:'No seleccionaste un viaje',
      });
      return;
    }
    //else
    Swal.fire({
      position: 'center',
      title: '¿Estas seguro de realizar el cambio',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result): any => {
      if (result.isConfirmed) {
        
        this.arraySelectedTravel.forEach(travelSelectedId => {

          //buscar el viaje a modificar
          let viajeModificar: TravelResponse[] = this.arrayActivos.filter(travel => travel.id === travelSelectedId)
          viajeModificar.forEach(travel => {
            this.idCliente = travel.travelEquipmentDTOs[0].operator.id;
          })
          if (this.tipoGestion === '10') {
            this.resigned = true
            this.applyChanges(this.idCadetSeleted,travelSelectedId, this.idCliente, this.resigned, this.getNewStatus(viajeModificar[0].lastStatusTravel), viajeModificar)
          } else {
            this.resigned = false
            this.statusTravel = parseInt(this.tipoGestion)
            this.idCadetSeleted = this.tipoGestion === '1' || this.tipoGestion === '4' ? '0' : this.idCadetSeleted
            this.applyChanges(this.idCadetSeleted,travelSelectedId, this.idCliente, this.resigned, this.statusTravel, viajeModificar)
          }

        })
      }
    })
}
//funcion para aplicar los cambios
applyChanges(idCadete:string,idTravel:number,idCliente:number,resigned:boolean,statusTravel:number,viajeModificar:TravelResponse[]){
  this.travelService.changeTravels(idCadete,idTravel.toString(),idCliente.toString(),resigned,statusTravel.toString(),viajeModificar).subscribe(
    data =>{
      Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Cambio realizado con éxito',
         showConfirmButton: false,
         timer: 1600
       })
      this.actualizar()
      this.idCadetSeleted='-1'
      this.tipoGestion='-1'
      this.arraySelectedTravel=[]
      console.log(data)
    },error =>{
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: `${error.error}`,
      })
    })
}

forkJoinActivos(){
   let travelStatus1= this.travelService.getTravels(1);
   let travelStatus2= this.travelService.getTravels(2);
   let travelStatus3= this.travelService.getTravels(3);
   let travelStatus4= this.travelService.getTravels(4);
   let travelStatus5= this.travelService.getTravels(5);
   let travelStatus6= this.travelService.getTravels(6);
   let travelStatus7= this.travelService.getTravels(7);
   let travelStatus8= this.travelService.getTravels(8);
forkJoin([travelStatus1,travelStatus2,travelStatus3,travelStatus4,travelStatus5,travelStatus6,
    travelStatus7,travelStatus8]).subscribe(data =>{
      this.activos = [...data[0],...data[1],...data[2],...data[3],...data[4],...data[5],...data[6],...data[7]];
      this.dataSource.data = this.activos
      this.activos.forEach(travel =>{
        this.arrayActivos.push(travel)
      })
     
      this.isloading=false
    })
   }
 forkJoinEnCurso(){
  let travelStatus2= this.travelService.getTravels(2);
  let travelStatus3= this.travelService.getTravels(3);
  let travelStatus6= this.travelService.getTravels(6);
  let travelStatus7= this.travelService.getTravels(7);
  forkJoin([travelStatus2,travelStatus3,travelStatus6,
    travelStatus7]).subscribe(data =>{
      this.dataSource.data  = [...data[0],...data[1],...data[2],...data[3]];
      this.isloading=false
    })

 }
 forkJoinPendientes(){
  let travelStatus1= this.travelService.getTravels(1);
  let travelStatus5= this.travelService.getTravels(5);
  forkJoin([travelStatus1,travelStatus5]).subscribe(data =>{
      this.dataSource.data = [...data[0],...data[1]];
      this.isloading=false

  })
}
}
