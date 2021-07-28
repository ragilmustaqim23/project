import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  hide: boolean=true;
  constructor(
    
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  email= new FormControl('',[Validators.required, Validators.email]);
  password= new FormControl('', [Validators.required]);

  loading:boolean | undefined;
  login()
  {
    this.loading=true;
    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res=>{
      this.loading=false;
      this.router.navigate(['admin']);
    }).catch(err=>{
      this.loading=false;
      alert('Tidak dapat login');
    });
  }
}
