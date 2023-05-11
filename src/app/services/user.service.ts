import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbName = 'userDB';
  private objectStoreName = 'users';
  private usersSubject: Subject<User[]> = new Subject<User[]>();

  constructor() {
    this.addFakeUsers();
  }

  private addFakeUsers(): void {
    const fakeUsers: User[] = [
      { username: 'john.doe', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890', function: 'Developer', avatar: 'avatar-url', velocity: 'High', id_project: 'project-id', password: 'password1'},
      { username: 'jane.smith', first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', phone: '9876543210', function: 'Designer', avatar: 'avatar-url', velocity: 'Medium', id_project: 'project-id', password: 'password2'},
    ];

    fakeUsers.forEach((user) => {
      this.addUser(user)
        .then(() => console.log('Utilisateur ajouté avec succès:', user))
        .catch((error) => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
    });
  }

  async addUser(user: User): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.add(user);
    this.fetchUsers();
  }

  getUsers(): Observable<User[]> {
    this.fetchUsers();
    return this.usersSubject.asObservable();
  }

  async deleteUser(id: number): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.delete(id);
    this.fetchUsers();
  }

  login(email: string, password: string): Observable<User | undefined> {
    return new Observable((observer) => {
      this.getUsersFromDatabase()
        .then((users: User[]) => {
          const foundUser = users.find((user) => user.email === email && user.password === password);
          observer.next(foundUser);
          observer.complete();
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          observer.error(error);
        });
    });
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

  private fetchUsers(): void {
    this.getUsersFromDatabase()
      .then((users: User[]) => {
        this.usersSubject.next(users);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.usersSubject.next([]);
      });
  }

  private getUsersFromDatabase(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.openDatabase()
        .then((db: IDBDatabase) => {
          const transaction = db.transaction(this.objectStoreName, 'readonly');
          const objectStore = transaction.objectStore(this.objectStoreName);
          const users: User[] = [];

          const request = objectStore.openCursor();
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              users.push(cursor.value);
              cursor.continue();
            } else {
              resolve(users);
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
