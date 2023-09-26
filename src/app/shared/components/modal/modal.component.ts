import {Component, Input, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgModelGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {PostExt} from '../../interfaces';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TEXT_MODAL} from '../../constants';
import {CommonModule, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgIf, ReactiveFormsModule],
})
export class ModalComponent implements OnInit {
  @Input() data!: { type: string, post: PostExt };
  formPost!: FormGroup;
  titleModal = '';
  buttonText = '';
  protected readonly TEXT_MODAL = TEXT_MODAL;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    switch (this.data.type) {
      case 'add': {
        this.formPost = this.formBuilder.group({
          username: ['', Validators.required],
          datetime: ['', Validators.required],
          message: ['', Validators.required],
        });
        this.titleModal = TEXT_MODAL.add.titleModal;
        this.buttonText = TEXT_MODAL.add.buttonText;
        break;
      }
      case 'edit': {
        this.formPost = this.formBuilder.group({
          id: [this.data.post.id, Validators.required],
          username: [this.data.post.username, Validators.required],
          datetime: [this.data.post.datetime, Validators.required],
          message: [this.data.post.message, Validators.required],
        });
        this.titleModal = TEXT_MODAL.edit.titleModal;
        this.buttonText = TEXT_MODAL.edit.buttonText;
        break;
      }
      case 'delete': {
        this.titleModal = TEXT_MODAL.delete.titleModal;
        this.buttonText = TEXT_MODAL.delete.buttonText;
        break;
      }
    }

  }

  areObjectsEqual(objA: any, objB: any) {
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
  }

}
