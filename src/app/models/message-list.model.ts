import { Message } from "./message.model";


export class MeassageList {
    list: Message[];

    constructor(list: Message[]) {
        this.list = list;
    }

    add(message: Message){
        this.list.push(message);
    }
    remove(message: Message){
        this.list = this.list.filter(items => items.id !== message.id);
    }
}