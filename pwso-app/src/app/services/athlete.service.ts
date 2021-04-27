import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';
import { Sport } from '../models/sport';
import { Registrant } from '../models/registrant';
import { Athlete } from '../models/athlete';

@Injectable()
export class AthleteService implements IAutoEntityService<Athlete> {
  constructor(private http: HttpClient) {
  }


  load(entityInfo: IEntityInfo, id: string, criteria?: string): Observable<Athlete> {
    return this.http.get<Athlete>(
    // ********* for testing
    //
    `http://localhost:7071/api/${entityInfo.modelName}/${criteria}/${id}`
    //
    // **********
    // ********* for production
    //
    // `api/GetAthletesFunc/${entityInfo.uriName}/${criteria}/${id}`
    //
    // **********

      // `http://localhost:7071/api//GetAthletesFunc/${entityInfo.uriName}/${criteria}/${id}`

    );
  }

  loadAll(entityInfo: IEntityInfo): Observable<Athlete[]> {
    console.log(entityInfo.modelName);
    return this.http.get<Athlete[]>(

    // ********* for testing
    //
    `http://localhost:7071/api/GetAthletesFunc`
    //
    // **********
    // ********* for production
    //
    // `api/GetAthletesFunc`
    //
    // **********

    );

  }

  create(entityInfo: IEntityInfo, entity: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(

    // ********* for testing
    //
    `http://localhost:7071/api/SaveAthleteFunc`,
    entity
    //
    // **********
        // ********* for production
    //
    // `/api/athletes`, entity
    //
    // **********

    );
  }

  update(entityInfo: IEntityInfo, entity: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(

    // ********* for testing
    //
    `http://localhost:7071/api/SaveAthleteFunc`,
    entity
    //
    // **********
        // ********* for production
    //
    // `/api/athletes`, entity
    //
    // **********

    );
  }

  // delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.delete<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
  //   ).pipe(map(() => entity));
  // }
}
