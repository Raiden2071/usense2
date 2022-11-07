import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  EUR!: number;
  USD!: number;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getLiveData('EUR').pipe(
      tap(res => this.EUR = res.quotes.EURUAH),
      switchMap(() => this.appService.getLiveData('USD')),
      tap(res =>this.USD = res.quotes.USDUAH),
    ).subscribe();
  }

}
