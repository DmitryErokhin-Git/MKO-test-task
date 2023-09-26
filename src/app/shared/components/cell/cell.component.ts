import {Component} from '@angular/core';
import {LIMIT_CHARACTERS} from '../../constants';
import {DatePipe, NgSwitch, NgSwitchCase} from '@angular/common';
import {TruncatePipe} from '../../pipes/truncate.pipe';
import {HighlighterPipe} from '../../pipes/highlighter.pipe';

@Component({
  selector: 'app-id-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, HighlighterPipe, TruncatePipe, DatePipe],
})
export class CellComponent {
  field: any;
  post: any;
  keyword: any;
  content: any;
  protected readonly LIMIT_CHARACTERS = LIMIT_CHARACTERS;

}
