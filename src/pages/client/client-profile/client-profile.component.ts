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
  /**
   * Campos para pintar el valor en el input como valor
   */
  userMail ='';
  userName ='';
  userTlf = '';
  userPhoto= '';
  userId='';
  userAddress ='';
  userCp='';
  userProvince='';

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
      const userObject = JSON.parse(userJSON);
      this.userId = userObject.data.id; 
      this.myUser(this.userId);
      
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
      this.userAddress = this.user.data.pedidos.address;
      this.userCp = this.user.data.pedidos.cp;
      this.userProvince = this.user.data.pedidos.province;
      this.userPhoto = this.user.data.pedidos.image;
      this.nPedidos = this.user.data.pedidos.numeroPedido.length;
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
        tlf: this.editUser.get('tlf')?.value,
        mail: this.editUser.get('mail')?.value,
        address: this.editUser.get('address')?.value,
        cp: this.editUser.get('cp')?.value,
        province:  this.editUser.get('province')?.value,
      };
      console.log(user,'user',this.userId);
      
      
      // Llamar al servicio para registrar al usuario
      this.usersService.updatedUser(this.userId, user).subscribe(
        (response: any) => {
          console.log('Datos actualizados con éxito');
          this.router.navigate(['list']);
        },
        (error) => {
          if (error.status === 500) {
            // this.matSnackBar.open(
            //   'Ya existe un usuario con ese email',
            //   'Cerrar',
            //   {
            //     duration: 5000,
            //   }
            // );
          }
          console.log(error.status, 'status');
        }
      );
    }
  }
}
