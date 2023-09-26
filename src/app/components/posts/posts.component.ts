import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../shared/services/data.service';
import {PostExt} from '../../shared/interfaces';
import {combineLatest, of, switchMap} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {ToastrService} from 'ngx-toastr';
import {NOTIFICATION} from '../../shared/constants';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  selectedRow: PostExt | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  formSearch!: FormGroup;

  constructor(public dataService: DataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private toastr: ToastrService) {
    this.formSearch = this.formBuilder.group({
      keyword: [null, Validators.required],
    });

    this.dataService.loadData();

    combineLatest([
      this.activatedRoute.queryParams,
      this.dataService.tableData$,
    ]).pipe(
      switchMap(([params, data]) => {
        const page = params['page'];
        const totalPages = Math.ceil(data.length / this.itemsPerPage);

        if (page && page < 1 || this.containsNonDigitCharacter(page)) {
          this.goTo(1);
        } else if (totalPages && totalPages < page) {
          this.goTo(totalPages);
        } else {
          this.currentPage = page;
          this.goTo(page);
        }
        return of(null);
      }),
    ).subscribe();

  }

  ngOnInit() {
    this.formSearch.valueChanges
      // .pipe(debounceTime(500))
      .subscribe(filter => {
        this.dataService.search(filter.keyword);
        this.goTo(1);
      });
  }

  containsNonDigitCharacter(inputString: string): boolean {
    const regex = /\D/;
    return regex.test(inputString);
  }

  deletePost(id: number): void {
    this.detailsPost(null);
    this.dataService.deletePost(id);
  }

  detailsPost(post: PostExt | null) {
    this.selectedRow = post;
  }

  clearSearch() {
    this.formSearch.setValue({keyword: ''});
  }

  onPageChange(selectPage: number): void {
    this.currentPage = selectPage;
    this.goTo(this.currentPage);
  }

  setItemsPerPage(limit: number, total: any) {
    this.itemsPerPage = limit;
    if (Math.ceil(total / this.itemsPerPage) < this.currentPage) {
      this.currentPage = Math.ceil(total / this.itemsPerPage);
      this.goTo(this.currentPage);
    }
  }

  openModalWithData(type: string, post?: PostExt) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = {type, post};

    modalRef.result.then((result) => {
      switch (result.type) {
        case 'add': {
          this.dataService.addPost(result.post);
          break;
        }
        case 'edit': {
          this.dataService.editPost(result.post);
          this.selectedRow = result.post;
          break;
        }
        case 'delete': {
          this.deletePost(result.post.id);
          break;
        }
      }
    }).catch(() => this.toastr.warning(NOTIFICATION.MESSAGE_DONT_SAVE),
    );
  }

  private goTo(page = 1) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {page: page},
      queryParamsHandling: 'merge',
    });
  }

}
