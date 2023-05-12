import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Commande } from '../interface/commandes.interface';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private dbName = 'commandesDB';
  private objectStoreName = 'commandes';
  private commandesSubject: Subject<Commande[]> = new Subject<Commande[]>();
  private hasAddedFakeCommandes = false;

  constructor() {
    this.FakeCommandes();
  }

  private async FakeCommandes(): Promise<void> {
    const existingCommandes = await this.getCommandesFromDatabase();
    if (existingCommandes.length > 0 || this.hasAddedFakeCommandes) {
      return;
    }

    const fakeCommandes: Commande[] = [
      {
        name: 'Projet 1',
        avatar: 'https://picsum.photos/200/300',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc elit ultricies nunc, vitae aliquam nisl nunc eget nunc.',
        date: '2021-01-01',
      },
      {
        name: 'Projet 2',
        avatar: 'https://picsum.photos/200/300',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc elit ultricies nunc, vitae aliquam nisl nunc eget nunc.',
        date: '2021-01-01',
      },
    ];

    fakeCommandes.forEach((commande) => {
      this.addCommande(commande)
        .then(() => console.log('Commande ajoutée avec succès:', commande))
        .catch((error) => console.error('Erreur lors de l\'ajout de la commande:', error));
    });

    this.hasAddedFakeCommandes = true;
  }

  async addCommande(commande: Commande): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.add(commande);
    this.fetchCommandes();
  }

  getCommandes(): Observable<Commande[]> {
    this.fetchCommandes();
    return this.commandesSubject.asObservable();
  }

  async deleteCommande(id: number): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.delete(id);
    this.fetchCommandes();
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          db.createObjectStore(this.objectStoreName, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  private fetchCommandes(): void {
    this.getCommandesFromDatabase()
      .then((commandes: Commande[]) => {
        this.commandesSubject.next(commandes);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
        this.commandesSubject.next([]);
      });
  }

  private getCommandesFromDatabase(): Promise<Commande[]> {
    return new Promise((resolve, reject) => {
      this.openDatabase()
        .then((db: IDBDatabase) => {
          const transaction = db.transaction(this.objectStoreName, 'readonly');
          const objectStore = transaction.objectStore(this.objectStoreName);
          const commandes: Commande[] = [];

          const request = objectStore.openCursor();
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              commandes.push(cursor.value);
              cursor.continue();
            } else {
              resolve(commandes);
            }
          };

          request.onerror = (event: any) => {
            reject(request.error);
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}