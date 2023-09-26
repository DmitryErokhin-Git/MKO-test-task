import {Injectable} from '@angular/core';
import {Post, PostExt, TableConfig} from '../interfaces';
import {ApiService} from './api.service';
import {ToastrService} from 'ngx-toastr';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject, catchError, finalize, forkJoin, Observable, tap} from 'rxjs';
import {NOTIFICATION} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tableConfigSubject = new BehaviorSubject<TableConfig>({thead: {columns: []}});
  public tableConfig$: Observable<TableConfig> = this.tableConfigSubject.asObservable();
  public tableDataSubject = new BehaviorSubject<PostExt[]>([]);
  public tableData$: Observable<PostExt[]> = this.tableDataSubject.asObservable();
  public loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService,
              private toastr: ToastrService,
              private loader: NgxUiLoaderService) {
  }

  loadData() {
    this.loader.startLoader('master');
    this.loadingSubject.next(true);

    forkJoin([
      this.apiService.getDataApi().pipe(
        tap((data: PostExt[]) => {
          this.tableDataSubject.next(data);
          this.toastr.success(NOTIFICATION.MESSAGE_LOAD_DATA);
        }),
      ),
      this.apiService.getConfigApi().pipe(
        tap((config: TableConfig) => {
          this.tableConfigSubject.next(config);
          this.toastr.success(NOTIFICATION.MESSAGE_LOAD_CONFIG);
        }),
      ),
    ]).pipe(
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
      finalize(() => {
        this.loadingSubject.next(false);
        this.loader.stopLoader('master');
      }),
    ).subscribe();
  }

  addPost(newPost: Post): void {
    this.apiService.addPostApi(newPost).pipe(
      tap((post: PostExt) => {
        const updatedTableData = [...this.tableDataSubject.value, post];
        this.tableDataSubject.next(updatedTableData);
        this.toastr.success(NOTIFICATION.MESSAGE_ADD);
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
      finalize(() => {
      }),
    ).subscribe();
  }

  editPost(editPost: PostExt): void {
    this.apiService.editPostApi(editPost).pipe(
      tap((post: PostExt) => {
        const updatedData = this.tableDataSubject.value.map((item) =>
          item.id === editPost.id ? post : item,
        );
        this.tableDataSubject.next(updatedData);
        this.toastr.success(NOTIFICATION.MESSAGE_EDIT);
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
      finalize(() => {
      }),
    ).subscribe();
  }

  deletePost(id: number): void {
    this.apiService.deletePostApi(id).pipe(
      tap(() => {
        this.tableDataSubject.next(
          this.tableDataSubject.value.filter(post => post.id !== id),
        );
        this.toastr.success(NOTIFICATION.MESSAGE_DELETE);
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
      finalize(() => {
      }),
    ).subscribe();
  }

  search(keyword: string) {
    const params = new HttpParams().set('q', keyword);

    this.apiService.getFilterDataApi(params).pipe(
      tap((data: PostExt[]) => {
        this.tableDataSubject.next(data);
        if (data.length === 0) {
          this.toastr.info(NOTIFICATION.MESSAGE_NO_MATCHES);
        }
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
      finalize(() => {
      }),
    ).subscribe();
  }

}
