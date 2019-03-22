


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MeassageList } from './models/message-list.model';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  incoming: MeassageList;
  support: MeassageList;
  marketing: MeassageList;
  ceo: MeassageList;


  constructor(private http: HttpClient) {
    this.loadFromStorage().subscribe(resp => this.incoming = resp);
   }

  loadFromStorage() {
    return this.http.get('../../fake-api.json').pipe(
      map(res => new MeassageList(
          (<Array<any>>res).map(item => new Message().deserialize(item))))
        );
  }
}
