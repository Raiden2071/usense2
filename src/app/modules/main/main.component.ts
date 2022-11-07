import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ConvertData, CurrencyData } from 'src/app/model/model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  listCurrencyCodes = ['UAH', 'USD', 'EUR'];

  form = this.fb.group({
    convertData1: this.fb.group(new ConvertData('UAH')),
    convertData2: this.fb.group(new ConvertData('USD')),
  });

  get currency1(): AbstractControl {
    return this.form.get('convertData1');
  }

  get currency2(): AbstractControl {
    return this.form.get('convertData2');
  }

  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.currency1.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.appService.preloader = true)),
        switchMap(() => this.calculate(true)),
        finalize(() => (this.appService.preloader = false))
      )
      .subscribe((res) => {
        this.appService.preloader = false;
        this.currency2!.patchValue(
          { amount: res.result.toPrecision(3) },
          { emitEvent: false }
        );
      });

    this.currency2.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.appService.preloader = true)),
        switchMap(() => this.calculate(false)),
        finalize(() => (this.appService.preloader = false))
      )
      .subscribe((res) => {
        this.appService.preloader = false;
        this.currency1!.patchValue(
          { amount: res.result.toPrecision(3) },
          { emitEvent: false }
        );
      });
  }

  calculate(origin: boolean): Observable<CurrencyData> {
    let from: AbstractControl | null;
    let to: AbstractControl | null;
    if (origin) {
      from = this.currency1;
      to = this.currency2;
    } else {
      to = this.currency1;
      from = this.currency2;
    }

    return this.appService.getConvertData(to, from);
  }
}
