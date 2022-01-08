import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import {UserResponse} from '../interface/userResponse'
describe('LoginService', () => {
  let service: LoginService;
  
 
  let httpClientSpy: { get: jasmine.Spy }; //TODO: 🙄

  beforeEach(() => { //TODO: Antes de cada it (prueba)
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LoginService(httpClientSpy as any);
  });

  //TODO: Que se cree!
  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Debe retornar objecto del usuario
  it('Deberia retornar objecto usuario (Login Correcto)', (done: DoneFn) => {

    //TODO: Mock de datos!

    const mockUserCredentials = { //TODO: Exito!
      email: 'victoria@gmail.com',
      password: '1234'
    }

    const mockResultLogin:UserResponse = {
      
        "id": 16,
        "email": "victoria@gmail.com",
        "fullName": "victoria",
        "address": "Av callao 1648",
        "cellPhone": "113345676",
        "isAccepted": true,
        "isDeleted": false,
        "observations": "ninguna",
        "password": "1234",
        "vehicle": null,
        "rol": {
          "id": 1,
          "name": "Administrador",
          "isDeleted": 0
        }
      
    }

    httpClientSpy.get.and.returnValue(of(mockResultLogin)) //TODO: Observable!

    //TODO: Act

    const { email, password } = mockUserCredentials

    service.Login(email,password)
      .subscribe(resultado => { //TODO: No se sabe el tiempo 
        expect(resultado).toEqual(mockResultLogin)
        done()
      })
  });

  it(`Deberia retornar error 403`, (done: DoneFn) => {
    //TODO: Mock de datos!

    const mockUserCredentials = {
      email: 'leifer33@gmail.com',
      password: '123'
    }

    const error403 = new HttpErrorResponse({
      error: "Usuario no existe",
      status: 403, statusText: 'Usuario no existe'
    })

    httpClientSpy.get.and.returnValue(throwError(error403))

    //TODO:Act
    const { email, password } = mockUserCredentials
    service.Login(email, password)
      .subscribe(res => {

      },
        error => {
          expect(error.status).toEqual(403);
          done()
        })

  })
});
