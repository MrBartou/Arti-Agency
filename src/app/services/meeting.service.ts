import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Meeting } from '../interface/meeting.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private dbName = 'meetingDB';
  private objectStoreName = 'meetings';
  private meetingsSubject: Subject<Meeting[]> = new Subject<Meeting[]>();

  constructor() { }

  async addMeeting(meeting: Meeting): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.add(meeting);
    this.fetchMeetings();
  }

  getMeetings(): Observable<Meeting[]> {
    this.fetchMeetings();
    return this.meetingsSubject.asObservable();
  }

  async deleteMeeting(id: number): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.delete(id);
    this.fetchMeetings();
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

  private fetchMeetings(): void {
    this.getMeetingsFromDatabase()
      .then((meetings: Meeting[]) => {
        this.meetingsSubject.next(meetings);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des réunions:', error);
        this.meetingsSubject.next([]);
      });
  }

  private getMeetingsFromDatabase(): Promise<Meeting[]> {
    return new Promise((resolve, reject) => {
      this.openDatabase()
        .then((db: IDBDatabase) => {
          const transaction = db.transaction(this.objectStoreName, 'readonly');
          const objectStore = transaction.objectStore(this.objectStoreName);
          const meetings: Meeting[] = [];

          const request = objectStore.openCursor();
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              meetings.push(cursor.value);
              cursor.continue();
            } else {
              resolve(meetings);
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
