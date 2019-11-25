import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AccountModel } from '../model/account.model'

@Injectable({
	providedIn: 'root'
})

export class AccountsService {
	private headers: HttpHeaders;
	baseurl = environment.baseURL;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
		this.GetAll();
	}

	public GetAll() {

		return this.http.get(this.baseurl + 'api/Accounts', { headers: this.headers });
	}

	public GetAccountById(id: Number) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		return this.http.get(this.baseurl + 'api/Accounts/' + id, { headers: reqHeader });
	}
	public Create(account: AccountModel) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		console.log(account);
		return this.http.post(this.baseurl + 'api/Accounts', account, { headers: reqHeader });
	}
	public Delete(id: Number) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		return this.http.delete(this.baseurl + 'api/Accounts/' + id, { headers: reqHeader });
	}

	public Update(account: AccountModel) {
		let reqHeader = new HttpHeaders();
		reqHeader.append('Content-Type', 'application/json');
		return this.http.put(this.baseurl + 'api/Accounts', account, { headers: reqHeader });
	}
}
