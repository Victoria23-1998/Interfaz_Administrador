export interface UserResponse {
    id:           number;
    email:        string;
    fullName:     string;
    address:      string;
    cellPhone:    string;
    isAccepted:   boolean;
    isDeleted:    boolean;
    observations: null|string;
    password:     string;
    vehicle:      null|string;
    rol:          Rol;
}

export interface Rol {
    id:        number;
    name:      string;
    isDeleted: number;
}