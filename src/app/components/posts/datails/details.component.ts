import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostExt} from '../../../shared/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() selectedRow: PostExt | null = null;
  @Output() editEvent = new EventEmitter();

}
