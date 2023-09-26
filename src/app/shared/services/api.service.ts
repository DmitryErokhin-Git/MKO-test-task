import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Post, PostExt, TableConfig} from '../interfaces';
import {environment} from '../../../environments/environment.dev';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly resourceUrl = `${environment.urlBackEndApi}`;

  constructor(private http: HttpClient) {
  }

  getConfigApi(): Observable<TableConfig> {
    return this.http.get<TableConfig>(`${this.resourceUrl}/config`).pipe(take(1));
  }

  getDataApi(): Observable<PostExt[]> {
    return this.http.get<PostExt[]>(`${this.resourceUrl}/posts`).pipe(take(1));
  }

  getFilterDataApi(params: Params): Observable<PostExt[]> {
    return this.http.get<PostExt[]>(`${this.resourceUrl}/posts`, {params}).pipe(take(1));
  }

  addPostApi(newPost: Post): Observable<PostExt> {
    return this.http.post<PostExt>(`${this.resourceUrl}/posts`, newPost).pipe(take(1));
  }

  editPostApi(editPost: PostExt): Observable<PostExt> {
    return this.http.patch<PostExt>(`${this.resourceUrl}/posts/${editPost.id}`, editPost).pipe(take(1));
  }

  deletePostApi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/posts/${id}`).pipe(take(1));
  }

}
