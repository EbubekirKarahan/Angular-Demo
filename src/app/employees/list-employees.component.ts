import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

import { SimpleService } from '../services/simple.service'


import { Http,
  Headers
 } from '@angular/http'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html'
})
export class ListEmployeesComponent implements OnInit {
  
  person_data:Employee[]; 
  loaded:boolean=true;
  ready=false;
  hata = false;
  access_token:string;

  constructor(private simpleService:SimpleService, private http:Http) { 
    this.access_token=simpleService.getToken();
  }

  ngOnInit() {


    let url='http://www.kalemerp.com:8290/customer/filter'
    
    let headers : Headers=new Headers();
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    headers.append("Authorization", 'Bearer '+this.access_token);
		
    let payload={"filter":{"company":{"id":7},"compress":"NO"},"query":{"paging":{"limit":100,"fetch":"EAGER"}}};
    
    this.http.post(url, payload, {headers: headers})
      .subscribe(res=>{        
        this.person_data=res.json().data;
        this.ready=true;
      },
      (error:any)=>{
        this.ready=true;
        this.hata = true;
        this.loaded = false;
        console.info(error.json())
      })
  }

}
