import { Component } from '@angular/core';
import { IUser } from 'src/core/services/models/user-models';
import { UsersService } from 'src/core/services/users/users.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  users: IUser[] = [];
  numberPedidos: number =0;

  constructor(
    private usersService: UsersService,
  ){}

  ngOnInit(){
    this.usersService.getUSers().subscribe((element)=> {
      this.users = element;
      
      this.users.forEach((user) => {
        this.numberPedidos = user.numeroPedido.length;
      });
    });
    
  }

}
