import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-treegrid';
import { HeaderDialog } from 'src/app/modal/header-dialog';
import { AddEditDialog } from 'src/app/modal/add-edit-column';
import { sampleData } from './datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dialogTitle: String = 'Change Column';
  dialogMessage: String = 'Are You Sure';
  rowIndex: Number = 0;
  cellIndex: Number = 0;
  freezeColumnIndex: Number = 0;
  allowSorting: Boolean = false;
  freezeColumnCheck: Boolean = false;
  allowFiltering: Boolean = false;
  chooseColumnCheck: Boolean = false;
  allowRowEdit: Boolean = false;
  allowRowMultiSelect: Boolean = false;
  menusList: any = {};
  editParams: Object = {};
  selectionSettings: Object = {};
  checkBoxMenuItems: Object = {};
  contextMenuItems: Object = {};
  taskNameFilter: Object = {};
  filterSettings: Object = {};
  sortSettings: any = { columns: [] };
  editSettings: EditSettingsModel = {};
  data: Object[] = [];
  gridColumns: Object[] = [];
  toolbarOptions: ToolbarItems[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.initializeGridColumns();
  }

  ngOnInit(): void {
    this.data = sampleData;
    this.menusList = {
      editColumn: false,
      newColumn: false,
      deleteColumn: false,
      chooseColumn: false,
      freezeColumn: false,
      filterColumn: false,
      multiSort: false,
    }

    this.contextMenuItems = [
      'Save',
      { text: 'Edit Column', target: '.e-gridheader', id: 'editCol' },
      { text: 'New Column', target: '.e-gridheader', id: 'newCol' },
      { text: 'Delete Column', target: '.e-gridheader', id: 'deleteCol' },
      { text: 'Choose Column', target: '.e-gridheader', id: 'chooseCol' },
      { text: 'Freeze Column', target: '.e-gridheader', id: 'freezeCol' },
      { text: 'Filter Column', target: '.e-gridheader', id: 'filterCol' },
      { text: 'Multi Sort', target: '.e-gridheader', id: 'multiSort' },
      { text: 'Add/Edit/Delete', target: '.e-content', id: 'addEditDelete' },
      { text: 'MultiSelect Rows', target: '.e-content', id: 'multiSelect' },
      { text: 'Copy Rows', target: '.e-content', id: 'copyRow' },
      { text: 'Paste Row', target: '.e-content', id: 'pasteRow' },
    ];

  }

  initializeGridColumns(): void {
    this.gridColumns = [
      { field: 'taskID', key: 1, edit: this.editParams, dataType: 'number', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'Task ID', visible: true, textAlign: 'Right', width: 70, isPrimaryKey: 'true' },
      { field: 'taskName', key: 2, edit: this.editParams, dataType: 'string', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'Task Name', visible: true, textAlign: 'Left', width: 200 },
      { field: 'priority', key: 3, edit: this.editParams, dataType: 'string', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'Priority', visible: true, textAlign: 'Left', width: 200 },
      { field: 'approved', key: 4, edit: this.editParams, dataType: 'boolean', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'Approved', visible: true, textAlign: 'Left', width: 200 },
      { field: 'startDate', key: 5, edit: this.editParams, dataType: 'date', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'Start Date', visible: true, textAlign: 'Right', format: 'yMd', width: 90 },
      { field: 'endDate', key: 6, edit: this.editParams, dataType: 'date', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'End Date', visible: true, textAlign: 'Right', format: 'yMd', width: 90 },
      { field: 'duration', key: 7, edit: this.editParams, dataType: 'datetime', customAttributes: { class: 'customcss' }, textWrap: false, headerText: 'Duration', visible: true, textAlign: 'Right', width: 80 }
    ];
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Columns

  editColumn(field: any): void {
    this.dialogTitle = 'Edit Column';
    const columnData: any = this.gridColumns.find((element: any) => element.field === field);

    const dialogRef = this.dialog.open(AddEditDialog, {
      width: '350px',
      data: { title: this.dialogTitle, columnData },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.gridColumns.findIndex((element: any) => element.field === field);
        this.gridColumns[index] = {
          ...this.gridColumns[index],
          ...result, foreignKeyField: result.field,
          headerText: this.capitalizeFirstLetter(result.headerText && result.headerText),
          textAlign: this.capitalizeFirstLetter(result.textAlign && result.textAlign),
          customAttributes: { class: 'customcss' }
        }

        const treegrid = (document.getElementsByClassName("e-treegrid") as any)[0]?.ej2_instances[0];
        treegrid.refreshColumns();
        this.openSnackBar('Column Updated Successfuly', 'Ok')
      }
    });
  }

  addNewColumn(): void {
    this.dialogTitle = 'Create Column';
    const dialogRef = this.dialog.open(AddEditDialog, {
      width: '350px',
      data: { title: this.dialogTitle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gridColumns.push({
          ...result,
          foreignKeyField: result.headerText,
          key: this.gridColumns.length + 1,
          field: result.headerText?.toLowerCase(),
          headerText: this.capitalizeFirstLetter(result.headerText),
          textAlign: this.capitalizeFirstLetter(result.textAlign),
          customAttributes: { class: 'customcss' }
        });
        const treegrid = (document.getElementsByClassName("e-treegrid") as any)[0]?.ej2_instances[0];
        treegrid.refreshColumns();
        this.openSnackBar('Column Added Successfuly', 'Ok')
      }
    });

  }

  openDeleteDialog(field: any) {
    this.dialogTitle = 'Delete Column';
    this.dialogMessage = 'Are you sure you want to delete?';

    const dialogRef = this.dialog.open(HeaderDialog, {
      width: '250px',
      data: { title: this.dialogTitle, message: this.dialogMessage },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const key = this.gridColumns.findIndex((element: any) => element.field === field);
        const treegrid = (document.getElementsByClassName("e-treegrid") as any)[0]?.ej2_instances[0];
        this.gridColumns.splice(key, 1);
        treegrid.refreshColumns();
        this.openSnackBar('Column Deleted Successfuly', 'Ok')
      }
    });

  }

  chooseColumn(field: any): void {
    if (this.chooseColumnCheck) {
      this.dialogTitle = 'Column Already Choosen';
      this.dialogMessage = 'Click Yes To Reset The Columns?';
      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gridColumns.forEach((element: any) => {
            element.visible = true;
          });
          const treegrid = (document.getElementsByClassName("e-treegrid") as any)[0]?.ej2_instances[0];
          treegrid.refreshColumns();
          this.chooseColumnCheck = false;

          this.openSnackBar('Column Reset Successfuly', 'Ok')
        }
      });
    }
    else {
      this.dialogTitle = 'Choose Column';
      this.dialogMessage = 'Are you sure you want to choose this column?';
      this.chooseColumnCheck = true;
      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gridColumns.forEach((element: any) => {
            if (element.field !== field) {
              element.visible = false;
            }
          });
          const treegrid = (document.getElementsByClassName("e-treegrid") as any)[0]?.ej2_instances[0];
          treegrid.refreshColumns();
          this.openSnackBar('Choosen Column Selected', 'Ok')
        }
      });
    }
  }

  freezeColumn(field: any): void {

      this.dialogTitle = 'Freeze Column';
      this.dialogMessage = 'Are you sure you want to freeze this column?';

      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const columnData: any = this.gridColumns.find((element: any) => element.field === field);
          const { key } = columnData;
          if (key === this.gridColumns.length) {
            this.openSnackBar('Cannot Freeze All Columns', 'Ok')
            return
          }
          this.freezeColumnIndex = key
          this.freezeColumnCheck = true;
          this.openSnackBar('Column Frozen Enabled', 'Ok')
        }
      });
  }

  filterColumn(): void {
    if (this.allowFiltering) {
      this.dialogTitle = 'Remove Filter Column ';
      this.dialogMessage = 'Filters Aready Added, Do You Want To Remove?';

      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.allowFiltering = false;

          this.openSnackBar('Column Filtering Removed', 'Ok')
        }
      });
    }
    else {
      this.dialogTitle = 'Filter Column';
      this.dialogMessage = 'Are you sure you want to add filter these columns?';

      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.allowFiltering = true;
          this.filterSettings = {
            type: 'Menu'
          };
          this.openSnackBar('Column Filtering Enabled', 'Ok')
        }
      });
    }
  }

  multiSort(): void {
    if (this.allowSorting) {
      this.dialogTitle = 'Multi Sort Remove';
      this.dialogMessage = 'Sorting Aready Added, Do You Want To Remove??';

      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.allowSorting = false;
        }
      });
    }
    else {
      this.dialogTitle = 'Multi Sort';
      this.dialogMessage = 'Are you sure you want to add multi-sorting on these columns?';

      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.allowSorting = true;
          this.sortSettings = { columns: [] };
          this.gridColumns.forEach((element: any) => {
            this.sortSettings?.columns?.push({ field: element.field, direction: 'Ascending' })
            this.openSnackBar('Multi Sorting Enabled', 'Ok')
          })
        }
      });
    }

  }

  // Row Methods

  addMultiSelect(): void {
    this.allowRowMultiSelect = true
    this.selectionSettings = { type: 'Multiple' };
    this.openSnackBar('Multi Selection Enabled', 'Ok')
  }

  addEditUpdateRow(): void {
    if (this.allowRowEdit) {
      this.dialogTitle = 'Edit Rows';
      this.dialogMessage = 'Editing Already Enabled, Do you Want To Remove?'
      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.allowRowEdit = false;
          this.toolbarOptions = []
          this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: "Dialog" };
          this.openSnackBar('Editing Disabled On Rows', 'Ok')
        }
      });
    }
    else {
      this.dialogTitle = 'Edit Rows';
      this.dialogMessage = 'Are you sure you want to Enable Editing?'
      const dialogRef = this.dialog.open(HeaderDialog, {
        width: '250px',
        data: { title: this.dialogTitle, message: this.dialogMessage },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.allowRowEdit = true;
          this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
          this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Dialog" };
          this.openSnackBar('Editing Enabled On Rows', 'Ok')
        }
      });
    }
  }

  cutCopyRow(field: any): void {
    const treeGrid = (document.getElementsByClassName("e-treegrid") as any)[0]?.ej2_instances[0];
    this.editParams = { params: { format: 'n' } };
    this.selectionSettings = {
      type: 'Single',
      mode: 'Cell',
      cellSelectionMode: 'Box'
    };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Batch'
    }
    if (field == 'copyRow') {
      treeGrid.copy();
    } else if (field == 'pasteRow') {
      var rowIndex = this.rowIndex;
      var cellIndex = this.cellIndex;
      var copyContent = treeGrid.clipboardModule.copyContent;
      treeGrid.paste(copyContent, rowIndex, cellIndex);
    }
  }

  contextMenuOpen(args: any): void {
    this.rowIndex = args.rowInfo.rowIndex;
    this.cellIndex = args.rowInfo.cellIndex;
  }

  contextMenuClick(args?: any): void {
    const { column: { field }, event: { target: { id } } } = args;
    switch (id) {
      // Columns
      case "editCol":
        this.editColumn(field)
        break;
      case "newCol":
        this.addNewColumn()
        break;
      case "deleteCol":
        this.openDeleteDialog(field)
        break;
      case "chooseCol":
        if (this.freezeColumnCheck) this.openSnackBar('Cannot Choose Column After Freezing', 'Undo')
        else this.chooseColumn(field)
        break;
      case "freezeCol":
        this.freezeColumn(field)
        break;
      case "filterCol":
        this.filterColumn()
        break;
      case "multiSort":
        this.multiSort()
        break

      // Rows 
      case "multiSelect":
        this.addMultiSelect();
        break;
      case "addEditDelete":
        this.addEditUpdateRow()
        break;
      case "copyRow":
        this.cutCopyRow('copyRow')
        break;
      case 'pasteRow':
        this.cutCopyRow('pasteRow')
        break;
    }
  }

}

