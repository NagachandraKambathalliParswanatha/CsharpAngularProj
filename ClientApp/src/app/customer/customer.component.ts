import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../model/customer.model'
import { NgForm } from '@angular/forms';
import { CustomerService } from '../service/customer.service'
import { Router } from '@angular/router';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

	customer = new CustomerModel();
	customerList = []
	display: string = null;
	title: string = null;

	togglePopUp: boolean = false;
    customerIdForDelete: number = null;
  //  customerIdForUpdate: number = null;

	constructor(private crudService: CustomerService, private router: Router) { }

	ngOnInit() {
		this.display = "list";
		this.title = "Customer Listing";

		this.GetAllCustomers();
	}
	GetAllCustomers() {
		this.crudService.GetAll().subscribe(res => {
			console.log(res);
			let result = <CustomerModel[]>res;
			this.customerList = result;
		});
		console.log(this.customerList);
	}


	GetCustomerById(id: number) {
        this.crudService.GetCustomerById(id).subscribe(res => {
			let result = <CustomerModel>res;
			if (result !== null) {
				this.display = "addNew";
				this.customer = result;
			} else {
				alert('Encountered an error.');
			}
		});
    }

    GetCustomerByIdForUpdate(id: number) {
        this.crudService.GetCustomerById(id).subscribe(res => {
            let result = <CustomerModel>res;
            if (result !== null) {
                this.display = "UpdateCust";
                this.customer = result;
            } else {
                alert('Encountered an error.');
            }
        });
    }


	AddCustomer(form: NgForm) {
		console.log(form.value);
		this.customer = <CustomerModel>form.value;
		this.customer.ws_cust_id = 0;
		console.log(this.customer);
		this.crudService.Create(this.customer).subscribe(res => {
			let result = <boolean>res;
			if (result) {
				form.reset();
				this.display = "list";
				this.GetAllCustomers();
				alert('New Customer Added.');
			} else {
				alert('Encountered an error.');
			}

		});

    }
    //ConfirmUpdate(id: number) {
    //    this.togglePopUp = true;
    //    this.customerIdForUpdate = id;

    //}

    UpdateCustomer(customer: CustomerModel, form: NgForm) {
        this.crudService.Update(this.customer).subscribe(res => {
			let result = <boolean>res;
			if (result) {
				form.reset();
				this.display = "list";
				this.title = "Partner";
				this.GetAllCustomers();
				alert('Customer Information Updated.');
			} else {
				alert('Encountered an error.');
			}
		});
	}

	ConfirmDelete(id: number) {
        this.togglePopUp = true;
        this.customerIdForDelete = id;
  
	}
    
    DeleteCustomer() {
        console.log("delete component");
		this.crudService.Delete(this.customerIdForDelete).subscribe(res => {
			this.togglePopUp = false;
			let result = <boolean>res;
			if (result) {
				this.GetAllCustomers();
				alert('Customer Information Deleted.');
			} else {
				alert('Encountered an error.');
			}
		});
	}

	AddAccount(id: number) {
		alert("Account ID: " + id);
		this.router.navigate(["../account", {id}]);
	}

}
