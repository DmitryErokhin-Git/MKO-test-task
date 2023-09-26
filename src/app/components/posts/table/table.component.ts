import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PostExt, TableConfig} from '../../../shared/interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableConfig$!: Observable<TableConfig>;
  @Input() tableData$!: Observable<PostExt[]>;
  @Input() loading$!: Observable<boolean>;
  @Input() formSearch!: FormGroup;
  @Input() selectedRow: PostExt | null = null;
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Output() openModal = new EventEmitter();
  @Output() details = new EventEmitter();

  areObjectsEqual(objA: any, objB: any) {
    if (objA && objB) {
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);

      if (keysA.length !== keysB.length) {
        return false;
      }
      for (const key of keysA) {
        if (objA[key] !== objB[key]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

}
