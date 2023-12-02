import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'src/core/services/jwt/jwt.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/core/services/users/users.service';
import { logoService } from 'src/core/services/logo/logo.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  public newPassword: FormGroup;
  public submitted: boolean = false;

  userId='';
  userName='';

  logoUrl: string = '';


  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private logoService: logoService,
  ){ 
    this.newPassword = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['',[Validators.required]]
      // password: [''],
      // confirmPassword:[''],
    });
  }

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
       const token = params['token'];
       const decodeToken = this.jwtService.decodeToken(token);
       console.log(decodeToken.id);
       this.userId = decodeToken.id;
       this.userName = decodeToken.user
       
      // const decodedToken = jwt.decode(token);
      // console.log(decodedToken);
      
     
     
    });
    this.logoService.logoUrl$.subscribe(newLogoUrl => {
      this.logoUrl = newLogoUrl;
    });
  }

  public onSubmit(): void {

    this.submitted = true;
    if (this.newPassword.valid) {
      const user: any = {
        password: this.newPassword.get('password')?.value,
       confirmPassword: this.newPassword.get('confirmPassword')?.value,
      };
      console.log(user);
      this.usersService.changePassword(this.userId,user.password).subscribe((response)=>{
        console.log(response);
        // this.usersService.login(user).subscribe(
        //   (response) => {
        //     //this.loading = false;
        //     console.log(response,'response');
        //     console.log('Datos enviados con éxito');
        //     // this.snackBar.open(
        //     //   'Usurio Logueado Correctamente',
        //     //   'Cerrar',
        //     //   {
        //     //     duration: 3000,
        //     //   }
        //     // );
        //     this.router.navigate(['list']);
        //   })
      });
      this.router.navigate(['user'])
      
  }

  
  
}
}
