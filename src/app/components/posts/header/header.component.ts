import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() formSearch!: FormGroup;
  @Output() clearSearch = new EventEmitter();
  @Output() addEvent = new EventEmitter();

}
