import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string | null>(null);

  getMessage() {
    return this.messageSubject.asObservable();
  }

  setMessage(message: string) {
    this.messageSubject.next(message);
  }
}
