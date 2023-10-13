import { Users } from "./Users";

export interface MesControle {
    id?: number;
    userId?: number;
    user?: Users | null;
    mes: string;
    ano: string;
}