import { Users } from "./Users";

export interface MesControle {
    id?: number;
    userId?: number;
    nomeMes: string;
    controleAtivo?: boolean;
    ano: string;
}