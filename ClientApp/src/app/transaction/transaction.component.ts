import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service'
import { TransactionModel } from '../model/transaction.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
	transaction = new TransactionModel();
	transactionList: any = [];
	display: string = null;
	title: string = null;
	customerID: number;

	constructor(private crudService: TransactionService, private Aroute: ActivatedRoute, private route: Router) { }

    togglePopUp: boolean = false;
    transactionIdForDelete: number = null;
    //  customerIdForUpdate: number = null;

   
    ngOnInit() {
        this.display = "list";
		this.title = "Transaction Listing";

		this.Aroute.paramMap.subscribe(
			params => { this.customerID = +params.get('id') });
		console.log("Customer ID: " + this.customerID);	
        this.GetAllTransactions();
	  }

    GetAllTransactions() {
        this.crudService.GetAll().subscribe(res => {
            console.log(res);
            let result = <TransactionModel[]>res;
            this.transactionList = result;
		});
		console.log(this.transactionList);
    }


    GetTransactionById(id: number) {
        this.crudService.GetTransactionById(id).subscribe(res => {
            let result = <TransactionModel>res;
            if (result !== null) {
                this.display = "addNew";
                this.transaction = result;
            } else {
                alert('Encountered an error.');
            }
        });
    }

    GetTransactionByIdForUpdate(id: number) {
        this.crudService.GetTransactionById(id).subscribe(res => {
            let result = <TransactionModel>res;
            if (result !== null) {
                this.display = "UpdateCust";
                this.transaction = result;
            } else {
                alert('Encountered an error.');
            }
        });
    }


    AddTransaction(form: NgForm) {
        console.log(form.value);
		this.transaction = <TransactionModel>form.value;
		this.transaction.ws_cust_id = this.customerID;
     
        this.crudService.Create(this.transaction).subscribe(res => {
            let result = <boolean>res;
            if (result) {
                form.reset();
                this.display = "list";
                this.GetAllTransactions();
                alert('New Transaction Added.');
            } else {
                alert('Encountered an error.');
            }
			console.log(this.transaction);
        });

    }
    //ConfirmUpdate(id: number) {
    //    this.togglePopUp = true;
    //    this.customerIdForUpdate = id;

    //}

    UpdateTransaction(transaction: TransactionModel, form: NgForm) {
        this.crudService.Update(this.transaction).subscribe(res => {
            let result = <boolean>res;
            if (result) {
                form.reset();
                this.display = "list";
                this.title = "Partner";
                this.GetAllTransactions();
                alert('Transaction Information Updated.');
            } else {
                alert('Encountered an error.');
            }
        });
    }

    ConfirmDelete(id: number) {
        this.togglePopUp = true;
        this.transactionIdForDelete = id;

    }

    DeleteTransaction() {
        console.log("delete component");
        this.crudService.Delete(this.transactionIdForDelete).subscribe(res => {
            this.togglePopUp = false;
            let result = <boolean>res;
            if (result) {
                this.GetAllTransactions();
                alert('Transaction Information Deleted.');
            } else {
                alert('Encountered an error.');
            }
        });
	}
	

}
