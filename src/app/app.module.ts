import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterService, EditService, ToolbarService, SortService, FreezeService, ContextMenuService, ColumnChooserService } from '@syncfusion/ej2-angular-treegrid'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { HeaderDialog } from 'src/app/modal/header-dialog';
import { AddEditDialog } from 'src/app/modal/add-edit-column';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
@NgModule({
  declarations: [
    AppComponent,
    HeaderDialog,
    AddEditDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ContextMenuModule,
    ReactiveFormsModule,
    TreeGridModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatButtonModule,
    ButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule, MatDialogModule
  ],
  providers: [EditService, SortService, MatSnackBar, ToolbarService, FilterService, FreezeService, ContextMenuService, ColumnChooserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
