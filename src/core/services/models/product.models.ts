
export interface IProduct {
    id?:any;
    createdAt: string;
    name: string;
    description:string;
    unidades: number;    
    precio: number;
    image: string;
    totalPrice: number;
    stock: any;
    stockStatus:any ;
    user?: string;
}
// export enum TypeGasto {
//   "casa" = "casa",
//   "moto" = "moto",
//   "coche" = "coche",
//   "sua"= "sua",
//   "personal" = "personal",
//   "otro" = "otro"
// }
//export const TypeOfCar = Object.values(TypeGasto);



