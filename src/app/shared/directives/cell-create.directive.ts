import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {CellComponent} from '../components/cell/cell.component';

@Directive({
  selector: '[cell-container]',
  standalone: true,
})
export class CellCreateDirective implements OnInit {
  @Input() field!: any;
  @Input() post!: any;
  @Input() keyword!: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (this.field !== 'actions') {
      const factory = this.componentFactoryResolver.resolveComponentFactory(CellComponent);
      const componentRef = factory.create(this.viewContainer.injector);
      this.viewContainer.insert(componentRef.hostView);
      const instance = componentRef.instance as CellComponent;
      instance.field = this.field;
      instance.post = this.post;
      instance.keyword = this.keyword;
    }
  }
}
