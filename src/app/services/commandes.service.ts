import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Commande {
  id: number;
  name: string;
  avatar: string;
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private commandesUrl = 'assets/db/commandes.json';

  constructor(private http: HttpClient) { }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.commandesUrl);
  }

  getCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.commandesUrl}/${id}`);
  }

  addCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(this.commandesUrl, commande);
  }

  updateCommande(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.commandesUrl}/${commande.id}`, commande);
  }

  deleteCommande(id: number): Observable<Commande> {
    return this.http.delete<Commande>(`${this.commandesUrl}/${id}`);
  }
}
