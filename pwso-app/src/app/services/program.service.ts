import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';
import { Program } from '../models/program';

@Injectable()
export class ProgramService implements IAutoEntityService<Program> {
  constructor(private http: HttpClient) {
  }

  // load(entityInfo: IEntityInfo, id: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}/${id}`
  //   );
  // }

  loadAll(entityInfo: IEntityInfo): Observable<Program[]> {
    return this.http.get<Program[]>(
      `http://localhost:7071/api/programs`
    );
  }

  // create(entityInfo: IEntityInfo, entity: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${environment.rootUrl}/${entityInfo.modelName}`,
  //     entity
  //   );
  // }

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
