import { Deserializable } from './deserializeable.model';

export class Message implements Deserializable {

    id: string;
    summary: string;
    email: string;
    date: Date;

    deserialize(input:any) {
        this.id = (~~(Math.random()*1e8)).toString(16);
        Object.assign(this, input);
        return this;
    }

}