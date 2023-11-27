import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Game {

}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL: string = "http://localhost:3000/api";



  games$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private http: HttpClient) { }

  // get all
  getAllGames(): void {
    this.http.get<any[]>(`${this.baseURL}/games`).subscribe(result => {
      this.games$.next(result);
    });
  }

  // get 1 by id
  getOneGame(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/games/${id}`);
  }

  // create new
  createGame(game: any): void {
    this.http.post<any>(`${this.baseURL}/games`, game).subscribe(result => {
      this.getAllGames();
      // return true;
    });
  }

  // update exsisting
  updateGame(game: any): void {
    this.http.put<any>(`${this.baseURL}/games/${game.gameId}`, game).subscribe(result => {
      this.getAllGames();
      // return true;
    });
  }


  // delete by id
  deleteGame(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/games/${id}`);
  }
}
