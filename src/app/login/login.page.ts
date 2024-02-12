import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userApi:UtilisateurService,public storeApi:StorageService,private messageApi:MessageService,private fb:FormBuilder,private router:Router) { }
  loginForm!:FormGroup;
  submitted=false;
  loginInProgress=false;
  isError=false;
  isSuccess=false;
  ngOnInit() {
    this.loginForm=this.fb.group({
      identifiant:['',Validators.required],
      password:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(40)]],
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Set registrationInProgress to true to disable the button and show the loader
      this.loginInProgress = true;
      this.userApi.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.storeApi.set('user_data',res.userData);
          this.storeApi.set('token',res.jwt_token);
          this.messageApi.setMessage('Connexion réussie ! Bon retour sur notre plateforme de réservation.');
          setTimeout(()=>{
            this.loginInProgress=false;
            this.isSuccess=true;
            this.router.navigate(['/home']);
          },3000);
         
  
        },
        error: (e) => {
          this.isError=true;
          setTimeout(()=>{
            this.isError=false;
          },3000);
          this.loginInProgress=false;
          console.error(e)
        }
      });
    }
  }

}
