import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'add-edit-dialog',
    templateUrl: 'add-edit-column.html'
})
export class AddEditDialog {
    title: string = '';
    ColumnDataForm!: FormGroup;
    editColumnValue: any = null;
    constructor(
        public dialogRef: MatDialogRef<AddEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
    ) {
        this.title = data.title;
        if (data.columnData) {
            const { headerText, dataType, width, textAlign, textWrap } = data.columnData
            this.editColumnValue = { headerText, dataType, width, textAlign, textWrap };
        }
    }

    ngOnInit() {
        if (this.editColumnValue) this.ColumnDataForm = this.formBuilder.group(this.editColumnValue);
        else
            this.ColumnDataForm = this.formBuilder.group({
                headerText: [''],
                dataType: [''],
                width: [''],
                textAlign: [''],
                textWrap: [false]
            });
    }

    onValueChange(key: any, event: any): void {
        const { target: { value, checked } } = event;
        this.ColumnDataForm.get(key)?.setValue(key === 'textWrap' ? checked : value);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        this.dialogRef.close(this.ColumnDataForm?.value);
    }

}

