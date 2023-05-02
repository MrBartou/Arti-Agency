import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Meeting {
  id: number;
  id_member: number;
  id_project: number;
  name: string;
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private meetingsUrl = 'assets/meetings.json';

  constructor(private http: HttpClient) { }

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.meetingsUrl);
  }

  getMeeting(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.meetingsUrl}/${id}`);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.meetingsUrl, meeting);
  }

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.meetingsUrl}/${meeting.id}`, meeting);
  }

  deleteMeeting(id: number): Observable<Meeting> {
    return this.http.delete<Meeting>(`${this.meetingsUrl}/${id}`);
  }
}
