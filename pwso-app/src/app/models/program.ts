import { Key } from '@briebug/ngrx-auto-entity';

export class Program {
  @Key id: number;
  name: string;
  sportid: number;
  year?: number;
 }
