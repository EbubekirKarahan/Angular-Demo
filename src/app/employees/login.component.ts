import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router'

import { SimpleService } from '../services/simple.service'

import { Http,  Headers } from '@angular/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform:FormGroup;
  name:FormControl;
  pswr:FormControl;
  showMe:boolean=false;
  
  constructor(private router:Router, 
              private simpleService:SimpleService,
              private http:Http){

              }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls():void{
    this.name= new FormControl('',[Validators.required, Validators.minLength(5)]);
    this.pswr= new FormControl('',Validators.required);
  }
  createForm():void{
    this.myform=new FormGroup({
      name:this.name,
      pswr:this.pswr
    })
  }
  

  url:string = 'http://www.kalemerp.com:8288/oauth/token';

  headers : Headers=new Headers();
  
  redirectComponent(url:string):void{
      // this.eventToParent.emit(data);//emits the data to the parent
      this.router.navigate([url]);//redirects url to new component      
  }

  onSubmit():void{
   
    if(this.myform.valid){
      let token:string;

      let bodyString = `username=${this.name.value}&password=${this.pswr.value}&grant_type=password`;
      this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
      this.headers.set("Authorization", "Basic UFJPVklERVI6MTIzNDU2Nzg=");

      this.http.post(this.url, bodyString, {headers: this.headers})
      .subscribe(res=>{        
        token=res.json().access_token;
        console.log(token)
        
        this.simpleService.setToken(token)

        this.redirectComponent("/list")
      },
      (error:any)=>{
        this.showMe=true;
        console.log(error)
      })
      
    }
  }

  onInputChange(inputValue: number): void { 
    this.showMe=false;
  }

}
