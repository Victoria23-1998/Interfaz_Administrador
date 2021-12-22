export interface UserRegister{
    id?:number;
    email:string,
    password:string | number,
    fullName:string
    address:string,
    cellPhone:number | string,
    isAccepted?:boolean,
    isDeleted?:boolean,
    observation?:string,
    vehicle?:Vehicle,
    rol?: Rol;
}
export interface Rol{
    id?:number;
    name:string;
    isDeleted?:number;
}
export interface Vehicle {
    id: number;
    name: string;
    isDeleted: number;
}