import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShowMenuService } from './service/show-menu.service';
import { User } from './auth/interface/localS';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ti-logistics-hub-cadet';
  name:string=''
  ShowMenu:boolean=true
  theme: Theme = 'light-theme';
 
  constructor(private router:Router,public show:ShowMenuService,
  @Inject(DOCUMENT) private document: Document,private renderer: Renderer2){}

  ngOnInit(): void {
    this.ShowMenu=this.show.showMenu()
    let localS:User = JSON.parse(localStorage.getItem('Usuario')||'');
    this.name= localS.fullName
    this.initializeTheme();
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
        
      } else if (result.isDenied) {
        console.log('no cerró sesión')
    }
  })
  }

  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')
    );
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);
}

export type Theme = 'light-theme' | 'dark-theme';