import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
// import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
  //     .pipe(map(dishes => dishes[0]));
  // }
  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
        .pipe(map(Promotion => Promotion[0]));
  }
}
