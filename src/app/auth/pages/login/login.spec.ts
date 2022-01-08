import { TestBed } from '@angular/core/testing';
import {LoginComponent} from './login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('LoginComponent', () => {
  

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            FormsModule,
            HttpClientTestingModule,
            RouterTestingModule//TODO: <-----
          ],
          declarations: [
            LoginComponent
          ],
        }).compileComponents();
    
      });
    
      it('Debe de existir el AppComponent', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.componentInstance
        expect(app).toBeTruthy(); 
      });

  it('debe retornar formulario invalido',()=>{
    const fixture = TestBed.createComponent(LoginComponent);
    const app= fixture.componentInstance
    fixture.detectChanges() //para detectar cambios en las variables

    const email = app.Login.controls['email']
    email.setValue('leifer33@gmail.com')
    expect(app.Login.invalid).toBeTrue();
 });

 it('debe retornar formulario válido', ()=>{
    const fixture = TestBed.createComponent(LoginComponent);
    const app= fixture.componentInstance
    fixture.detectChanges() //para detectar cambios en las variables

    const email = app.Login.controls['email']
    const password = app.Login.controls['password']
    email.setValue('leifer33@gmail.com')
    password.setValue('123456')
    expect(app.Login.invalid).toBe(false);
 });

});
