import { Users } from "./Users";

export class Category {
  id?: number;
  userId?: number;
  user?: Users | null;
  nomeCategoria?: string;
  tipoCategorias?: TipoConta;
}

export enum TipoConta {
  Despesa = 1,
  Renda = 2,
  RendaExtra = 3,
  RetornoInvestimento = 4,
}


