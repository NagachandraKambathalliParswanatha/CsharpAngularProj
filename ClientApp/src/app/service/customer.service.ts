import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CustomerModel } from '../model/customer.model'

@Injectable({
	providedIn: 'root'
})

  export class CustomerService {
	private headers: HttpHeaders;
	baseurl = environment.baseURL;

	constructor(private http: HttpClient)
	{
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
		this.GetAll();
	}

	public GetAll() {
		
		return this.http.get(this.baseurl + 'api/Customers', { headers: this.headers });
	}

	public GetCustomerById(id: Number) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		return this.http.get(this.baseurl + 'api/Customers/' + id, { headers: reqHeader });
	}
	public Create(customer: CustomerModel) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		console.log(customer);
		return this.http.post(this.baseurl + 'api/Customers', customer, { headers: reqHeader });
	}
    public Delete(id: Number) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		return this.http.delete(this.baseurl + 'api/Customers/' + id, { headers: reqHeader });
    }

    public Update(customer: CustomerModel) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		return this.http.put(this.baseurl + 'api/Customers', customer, { headers: reqHeader });
	}
}
