import { Key } from '@briebug/ngrx-auto-entity';

export class Registrant {
  @Key id: number;
  firstName: string;
  lastName: string;
  nickName?: string;
  size?: string;
  sportId: number;
  programId: number;
  email1: string;
  email2?: string;
  email3?: string;
  phone1: string;
  phone2?: string;
  phone3?: string;
  type1: string;
  type2?: string;
  type3?: string;
  text1: boolean;
  text2?: boolean;
  text3?: boolean;
  sportName?: string;
  programName?: string;
 }
