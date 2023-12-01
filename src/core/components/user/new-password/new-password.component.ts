import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ){ }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      
      const token = params['token'];
      if (token) {
        console.log(token,'token');
        
        // Haz lo que necesitas con el token, por ejemplo, llama a un servicio para restablecer la contraseña
        // this.authService.resetPasswordWithToken(token).subscribe(
        //   response => {
        //     console.log(response); // Maneja la respuesta del servicio
        //   },
        //   error => {
        //     console.error(error); // Maneja el error del servicio
        //   }
        // );
      }
    });
  }
  
}
