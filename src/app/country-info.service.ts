import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Country } from './country-info-interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CountryInfoService {

  countryUrl = "/api/country";
  constructor(private http: HttpClient) { }
  getAllCountry(): Observable<Country[]> {
        return this.http.get<Country[]>(this.countryUrl).pipe(
            catchError(this.handleError)
        );
    }
    createCountry(country: Country): Observable<number> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Country>(this.countryUrl + "/" + country.id, country, {
            headers: httpHeaders,
            observe: 'response'
        }
        ).pipe(
            map(res => res.status),
            catchError(this.handleError)
        );
    }
    getCountryById(countryId: string): Observable<Country> {
        return this.http.get<Country>(this.countryUrl + "/" + countryId).pipe(
            tap(country => console.log(country.state)),
            catchError(this.handleError)
        );
    }
    updateCountry(country: Country): Observable<number> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Country>(this.countryUrl + "/" + country.id, country, {
            headers: httpHeaders,
            observe: 'response'
        }
        ).pipe(
            map(res => res.status),
            catchError(this.handleError)
        );
    }
    deleteCountryById(countryId: string): Observable<number> {
        return this.http.delete<number>(this.countryUrl + "/" + countryId).pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}
