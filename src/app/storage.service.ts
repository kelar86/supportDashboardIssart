import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Message } from './models/message.model';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _incoming: BehaviorSubject<Message[]>;
  private _support: BehaviorSubject<Message[]>;
  private _marketing: BehaviorSubject<Message[]>;
  private _ceo: BehaviorSubject<Message[]>;

  private dataStore: {
    incoming: Message[],
    support: Message[],
    marketing: Message[],
    ceo: Message[]
  };

  constructor(private http: HttpClient) {
    this.dataStore = {
      incoming: [],
      support: [],
      marketing: [],
      ceo: [],
    };

    this._incoming = new BehaviorSubject([]);
    this._support  = new BehaviorSubject([]);
    this._marketing  = new BehaviorSubject([]);
    this._ceo  = new BehaviorSubject([]);


   }

  init() {
    return this.http.get('../../fake-api.json').pipe(
      map(res => (<Array<any>>res).map(item => new Message().deserialize(item))))
      .subscribe(data => {
        this.dataStore.incoming = data;
        this._incoming.next(Object.assign({}, this.dataStore).incoming);
      },
      error => console.log(error));
  }

  get incoming() {
    return this._incoming.asObservable();
  }
  get support() {
    return this._support.asObservable();
  }
  get marketing() {
    return this._marketing.asObservable();
  }
  get ceo() {
    return this._ceo.asObservable();
  }

  update(data) {
    this.dataStore = data;
    this._incoming.next(this.dataStore.incoming);
    this._support.next(this.dataStore.support);
    this._marketing.next(this.dataStore.marketing);
    this._ceo.next(this.dataStore.ceo);

  }
}
