import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { MessageService } from '../services/message.service';
import { Utilisateur } from '../models/utilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  registerForm!:FormGroup;
  submitted=false;
  registrationInProgress=false;
  constructor(private fb:FormBuilder,private apiUser:UtilisateurService,private router:Router,private messageApi:MessageService) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      numero_telephone:['',Validators.required],
      mot_de_passe:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(40)]],
      confirm_password:['',Validators.required],
      acceptCondition: [false, Validators.requiredTrue],

    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  onSubmit(){
    console.log(this.registerForm.valid);
    if(this.registerForm.valid) {
      // Set registrationInProgress to true to disable the button and show the loader
      this.registrationInProgress = true;
      this.apiUser.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.messageApi.setMessage('Félicitations ! Votre compte a été créé avec succès.');
          this.submitted = true;
          
          setTimeout(()=>{
            this.registrationInProgress=false;
            this.router.navigate(['/login']);
          },3000);
        },
        error: (e) => console.error(e)
      });
    }
    console.log(JSON.stringify(this.registerForm.value, null, 2));
  }
}
