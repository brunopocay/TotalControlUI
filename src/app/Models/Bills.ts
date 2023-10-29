import { Category, TipoCategoria } from "./Category";
import { MesControle } from "./Month";

export interface Bills {
  id: number;
  categoriaId: Category;
  mesId: MesControle;
  diaInclusao: Date;
  tipoConta: TipoCategoria;
  valorDaConta: number;
  descricao: string;
}

