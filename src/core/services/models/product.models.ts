
export interface IProduct {
    _id?:any;
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
    status?: number;
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



