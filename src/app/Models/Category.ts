import { Users } from "./Users";

export class Category {
  categoriaId?: number;
  userId?: number;
  user?: Users | null;
  nomeCategoria: string;
  tipoCategorias?: TipoCategoria;
}

export enum TipoCategoria {
  Despesa = 1,
  Renda = 2,
  RendaExtra = 3,
  RetornoInvestimento = 4,
}


