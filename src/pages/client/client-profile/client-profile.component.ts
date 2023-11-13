import { Component } from '@angular/core';
import { UsersService } from 'src/core/services/users/users.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  nPedidos = 0;

  public editUser: FormGroup;

  public submitted: boolean = false;
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){
    this.editUser = this.formBuilder.group({
      user: ['', [Validators.required ]],
      tlf: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      province: ['', [Validators.required]],


      
    });
   }

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
      this.nPedidos = this.user.data.pedidos.numeroPedido.length;
      console.log(this.nPedidos);


  })
  }

  public onSubmit(): void {
    //this.loading = true;
    // El usuario ha pulsado en submit -> cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.editUser.valid) {
      // Crear un objeto de usuario con los datos del formulario
      const user: any = {
        user: this.editUser.get('user')?.value,
        password: this.editUser.get('tlf')?.value,
        mail: this.editUser.get('mail')?.value,
        tlf: this.editUser.get('address')?.value,
        cp: this.editUser.get('cp')?.value,
        province:  this.editUser.get('province')?.value,
      };
      
      // Llamar al servicio para registrar al usuario
      // this.userServices.register(user).subscribe(
      //   (response) => {
      //     //this.loading = false;
      //     console.log('Datos enviados con éxito');
      //     // this.snackBar.open(
      //     //   'Usuario registrado correctamente',
      //     //   'Cerrar',
      //     //   {
      //     //     duration: 3000,
      //     //   }
      //     // );
      //     this.router.navigate(['list']);
      //   },
      //   (error) => {
      //     if (error.status === 500) {
      //       this.matSnackBar.open(
      //         'Ya existe un usuario con ese email',
      //         'Cerrar',
      //         {
      //           duration: 5000,
      //         }
      //       );
      //     }
      //     console.log(error.status, 'status');
      //   }
      // );
    }
  }
}
