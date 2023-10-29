import { Injectable } from '@angular/core';
import { MesControle } from '../Models/Month';

@Injectable({
  providedIn: 'root'
})
export class DataMonthService {

  private monthsData: any;
  constructor() {}


  SetMonthData<T>(data: T): void{
    this.monthsData = data;
    localStorage.setItem('monthsData', JSON.stringify(this.monthsData));
  }

  GetMonthData(): MesControle{
    this.monthsData = JSON.parse(localStorage.getItem('monthsData')!);
    return this.monthsData;
  }
}
