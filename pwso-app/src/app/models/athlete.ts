import { Key } from '@briebug/ngrx-auto-entity';

export class Athlete {
  @Key id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: Date;
  gender?: string;
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  parentInformation: AthleteParent[];
  medicalDate?: Date;
  medicalExpirationDate?: Date;
  medicalFormId?: string;
  medicalFormEndDate?: string;
}

export class AthleteParent {
  parentName?: string;
  relationship?: string;
  parentStreet?: string;
  parentCity?: string;
  parentState?: string;
  parentZipCode?: string;
  parentPhone?: string;
  parentEmail?: string;
}
