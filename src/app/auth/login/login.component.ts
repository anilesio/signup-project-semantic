import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formValue !: FormGroup
  public user : any

  constructor(private auth : AuthService, private formBuilder : FormBuilder, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.loginForm()
  }

  loginForm(){
    this.formValue = this.formBuilder.group({
      username : new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login(){
    if(!this.formValue.valid){
      this.toastr.warning("Campos vazios", "Erro no login")
      return
    }
    else{
      this.auth.getUser().subscribe(data => {
        if(data){
          this.user = data.find((a:any) =>{
            return a.username === this.formValue.value.username && a.password === this.formValue.value.password
          })
    
          if(this.user){
            this.toastr.success("Sucesso", "Sucesso")
          }
          else {
            this.toastr.warning("Erro no login", "Usuário não encontrado")
    
          }
        }
        else {
          this.toastr.error("Erro no login", "Falha na conexão")
        }
        
      })
    }
  }
}
