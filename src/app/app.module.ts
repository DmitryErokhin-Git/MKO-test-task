import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from './shared/components/modal/modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HighlighterPipe} from './shared/pipes/highlighter.pipe';
import {AppRoutingModule} from './app.routing';
import {TruncatePipe} from './shared/pipes/truncate.pipe';
import {CellComponent} from './shared/components/cell/cell.component';
import {CellCreateDirective} from './shared/directives/cell-create.directive';
import {PostsComponent} from './components/posts/posts.component';
import {toastrConfig} from './shared/constants';
import {DetailsComponent} from './components/posts/datails/details.component';
import {FooterComponent} from './components/posts/footer/footer.component';
import {HeaderComponent} from './components/posts/header/header.component';
import {TableComponent} from './components/posts/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    TableComponent,
    DetailsComponent,
    FooterComponent,
  ],
  imports: [
    CellComponent,
    ModalComponent,
    HighlighterPipe,
    CellCreateDirective,
    TruncatePipe,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig),
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
