import { Category, TipoConta } from './Category';
import { MesControle } from './Month';

export interface Bills {
  id?: number;
  categoria?: Category;
  mes: MesControle;
  diaInclusao?: Date | string;
  tipoConta: TipoConta;
  valorDaConta: number;
  descricao: string;
}
