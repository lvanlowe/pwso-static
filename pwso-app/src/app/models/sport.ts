import { Key } from '@briebug/ngrx-auto-entity';

export class Sport {
  @Key id: number;
  name: string;
  isTeamSport: boolean;
  canRegister: boolean;
  hasUniform: boolean;
  email?: string;
 }
