import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username
    password
	title = 'TrialName'

    constructor(private route: Router) {


    }

    ngOnInit() {
    }

    ClickMe() {
        if (this.username == 'Executive' && this.password == "Executive") {
			alert('Executive Login success!')
      this.route.navigate(['../customer'])
		}
        else if (this.username == 'Teller' && this.password == "Teller"){
			alert('Teller Login success!')
			this.route.navigate(['../account'])

		} else {
            alert('Login Fail!!!')
        }
    }
}
