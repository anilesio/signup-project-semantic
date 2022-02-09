import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formValue !: FormGroup
  public genero : any

  constructor(private formBuilder : FormBuilder, private service : AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm()
    this.getGenero()
  }

  createForm(){
    this.formValue = this.formBuilder.group({
      prmeiroNome : new FormControl(null, [Validators.required]),
      ultimoNome : new FormControl(null, [Validators.required]),
      telefone : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required]),
      genero : new FormControl(null, [Validators.required]),
      username : new FormControl(null, [Validators.required]),
      password : new FormControl(null, [Validators.required]),
      repitaPassword : new FormControl(null, [Validators.required])
    })
  }

  getGenero(){
    this.service.getGenero().subscribe(data => {
      this.genero = data
    })
  }

  submitForm(){
    const dados = this.formValue.value
    
    this.service.create(dados).subscribe(data => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.formValue.reset()

    })
    
  }

}
