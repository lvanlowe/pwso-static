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
  phoneType1: string;
  phoneType2?: string;
  phoneType3?: string;
  canText1: boolean;
  canText2?: boolean;
  canText3?: boolean;
  sportName?: string;
  programName?: string;
  isVolunteer?: boolean;
  isWaitlisted?: boolean;
  sender?: string;
 }
