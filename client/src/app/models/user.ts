//lo q estamos haciendo esq dentro del constructor estamos colocando el mismo modelo q se tenia en el backend y en la base de datos
export class User{
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ){}
}