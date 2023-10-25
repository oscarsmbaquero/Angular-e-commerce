import { IProduct } from 'src/core/services/models/product.models';

export interface IVenta{
    _id?: string;
    orderNumber: string;
    userBuy: string;
    //TODO. CAMBIAR EL TIPADO DE PRODUCTS
    products: IProduct[];
    estadoPedido: string;
    createdAt?: Date;
    isChecked?: boolean;
    salePrice: number;
    //data:{} 
}
 




