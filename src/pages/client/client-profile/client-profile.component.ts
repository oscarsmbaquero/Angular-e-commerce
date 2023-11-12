import { Component } from '@angular/core';
import { UsersService } from 'src/core/services/users/users.service';
@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent {

  user: any;
  userMail ='';
  userName ='';
  userTlf = '';
  userPhoto= '';
  constructor(
    private usersService: UsersService
  ){ }

  ngOnInit() {
    console.log('Order');
    
    const userJSON = localStorage.getItem('user');
    
    
    if (userJSON) {
      const userObject = JSON.parse(userJSON); // Parsea el JSON almacenado en 'user'
      const userId = userObject.data.id; // Accede al campo 'id' dentro del objeto 'data'
      console.log(userId); // Muestra el 'id' en la consola
      this.myUser(userId);
      
    } else {
      console.log('No se encontró ningún valor en localStorage para la clave "user".');
    }
  }

  myUser(id: string){
    this.usersService.getUSerById(id).subscribe((response) => {
      console.log(response);
      
      this.user = response; // Accede al objeto "data"
      this.userMail  = this.user.data.pedidos.mail;
      this.userName = this.user.data.pedidos.user;
      this.userTlf = this.user.data.pedidos.tlf;
      this.userPhoto = this.user.data.pedidos.image;
      console.log(this.userMail);


  })
  }
}
