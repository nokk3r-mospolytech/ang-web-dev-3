export interface Muser {
    id: number;
name: string;
    surname: string;
    patronymic: string;
    type: number;
    number: string;
    email: string;
    birthday: string;
}

export enum MyWorkerType {
    it,
    sales,
    delivery,
    legal
}