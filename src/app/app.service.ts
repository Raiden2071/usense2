import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CurrencyData, LiveCurrencyData } from './model/model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  preloader = false;

  constructor(private http: HttpClient) {}

  getConvertData(to, from): Observable<CurrencyData> {
    return this.http.get<CurrencyData>(
      `convert?to=${to!.value.currency}&from=${from!.value.currency}&amount=${
        from!.value.amount
      }`
    );
  }

  getLiveData(currency: string): Observable<LiveCurrencyData> {
    return this.http.get<LiveCurrencyData>(`live?source=${currency}&currencies=UAH`);
  }
}
