import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../model/customer.model'
import { NgForm } from '@angular/forms';
import { AccountsService } from '../service/accounts.service'
import { AccountModel } from '../model/account.model';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router'

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	account = new AccountModel();
	accountList: any = [];
	display: string = null;
	title: string = null;
	customerID: number;
	sameAcct = true;
	

	togglePopUp: boolean = false;
	accountIdForDelete: number = null;
	//  customerIdForUpdate: number = null;

	constructor(private crudService: AccountsService, private Aroute: ActivatedRoute, private route: Router) { }

	ngOnInit() {
		this.display = "list";
		this.title = "Account Listing";

		this.Aroute.paramMap.subscribe(
			params => { this.customerID = +params.get('id') });
		console.log("Customer ID: " + this.customerID);




		this.GetAllAccounts();
	}

	GetAllAccounts() {
		console.log("Customer ID: " + this.customerID);
		this.crudService.GetAll().subscribe(res => {
			console.log(res);
			let result = <AccountModel>res;
			this.accountList = result;
		});
		console.log(this.accountList);
	}


	GetAccountById(id: number) {
		this.crudService.GetAccountById(id).subscribe(res => {
			let result = <AccountModel>res;
			if (result !== null) {
				this.display = "addNew";
				this.account = result;
			} else {
				alert('Encountered an error.');
			}
		});
	}

	GetAccountByIdForUpdate(id: number) {
		this.crudService.GetAccountById(id).subscribe(res => {
			let result = <AccountModel>res;
			if (result !== null) {
				this.display = "UpdateAcct";
				this.account = result;
			} else {
				alert('Encountered an error.');
			}
		});
	}


	AddAccount(form: NgForm) {
		console.log(form.value);
		this.account = <AccountModel>form.value;
		this.account.ws_acct_id = 0;
		this.account.ws_cust_id = this.customerID;
		this.crudService.Create(this.account).subscribe(res => {
			let result = <boolean>res;
			if (result) {
				form.reset();
				this.display = "list";
				this.GetAllAccounts();
				alert('New Account Added.');
			} else {
				alert('Encountered an error.');
			}

		});

	}
	//ConfirmUpdate(id: number) {
	//    this.togglePopUp = true;
	//    this.customerIdForUpdate = id;

	//}

	UpdateAccount(account: AccountModel, form: NgForm) {
		this.crudService.Update(this.account).subscribe(res => {
			let result = <boolean>res;
			if (result) {
				form.reset();
				this.display = "list";
				this.title = "Partner";
				this.GetAllAccounts();
				alert('Account Information Updated.');
			} else {
				alert('Encountered an error.');
			}
		});
	}

	ConfirmDelete(id: number) {
		this.togglePopUp = true;
		this.accountIdForDelete = id;

	}

	DeleteAccount() {
		this.crudService.Delete(this.accountIdForDelete).subscribe(res => {
			this.togglePopUp = false;
			let result = <boolean>res;
			if (result) {
				this.GetAllAccounts();
				alert('Account Information Deleted.');
			} else {
				alert('Encountered an error.');
			}
		});
	}

	AddTransaction(id: number) {
		alert("Customer ID: " + id);
		this.route.navigate(["../transaction", {id}]);
	}
}
