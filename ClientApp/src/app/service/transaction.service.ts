import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { TransactionModel } from '../model/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    private headers: HttpHeaders;
    baseurl = environment.baseURL;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        this.GetAll();
    }

    public GetAll() {

        return this.http.get(this.baseurl + 'api/Transaction', { headers: this.headers });
    }

    public GetTransactionById(id: Number) {
        let reqHeader = new HttpHeaders();
        reqHeader.append('Content-Type', 'application/json');
        return this.http.get(this.baseurl + 'api/Transaction/' + id, { headers: reqHeader });
    }
    public Create(transaction: TransactionModel) {
        let reqHeader = new HttpHeaders();
        reqHeader.append('Content-Type', 'application/json');
        console.log(transaction);
        return this.http.post(this.baseurl + 'api/Transaction', transaction, { headers: reqHeader });
    }
    public Delete(id: Number) {
        let reqHeader = new HttpHeaders();
        reqHeader.append('Content-Type', 'application/json');
        return this.http.delete(this.baseurl + 'api/Transaction/' + id, { headers: reqHeader });
    }

    public Update(transaction: TransactionModel) {
        let reqHeader = new HttpHeaders();
        reqHeader.append('Content-Type', 'application/json');
        return this.http.put(this.baseurl + 'api/Transaction', transaction, { headers: reqHeader });
    }
}
