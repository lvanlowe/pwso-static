import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';
import { Sport } from '../models/sport';
import { Registrant } from '../models/registrant';

@Injectable()
export class RegistrantService implements IAutoEntityService<Registrant> {
  constructor(private http: HttpClient) {
  }

  // load(entityInfo: IEntityInfo, id: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${id}`
  //   );
  // }

  // loadAll(entityInfo: IEntityInfo): Observable<Sport[]> {
  //   return this.http.get<Sport[]>(
  //     `http://localhost:7071/api/sports`
  //   );
  // }

  create(entityInfo: IEntityInfo, entity: Registrant): Observable<Registrant> {
    return this.http.post<Registrant>(

    // ********* for testing
    //
    // `http://localhost:7071/api/registrants`,
    // entity
    //
    // **********
        // ********* for production
    //
    `/api/registrants`, entity
    //
    // **********

    );
  }

  // update(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.patch<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`,
  //      entity
  //   );
  // }

  // delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.delete<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
  //   ).pipe(map(() => entity));
  // }
}
