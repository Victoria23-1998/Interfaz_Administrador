import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShowMenuService } from './service/show-menu.service';
import { User } from './auth/interface/localS';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ti-logistics-hub-cadet';
  name:string=''
  ShowMenu:boolean=true

  @ViewChild(MatSidenav) sidenav!:MatSidenav
  constructor(private router:Router,public show:ShowMenuService, private observer:BreakpointObserver,
    private cdr: ChangeDetectorRef){}
  ngAfterViewInit(){
    this.observer.observe(['(max-width:900px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close()
       
      }else{
        this.sidenav.mode='side';
        this.sidenav.open()
       
      }
      this.cdr.detectChanges()
    })
  }
  async ngOnInit(): Promise<void> {
    let localS:User = await JSON.parse(localStorage.getItem('Usuario')||'');
    this.name= localS.fullName
    this.ShowMenu=this.show.showMenu()
   
   
  }
  

  async logout(){
    await Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then(async (result)=> {
      /* Read more about isConfirmed, isDenied below */
      if ( await result.isConfirmed) {
        localStorage.removeItem('Usuario');
        this.router.navigate(['/auth/login']);
      } 
  })
  }

  
}

