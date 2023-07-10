import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() type = '';

  show: boolean = false;

  @Input() formGroup!: FormGroup;

  @Input() controlName: any;

  @Input() placeholder: string = '';

  @Input() label!: string;

  @Input() isColumnView: boolean = false;

  @Input() gridClass: string = '';

  @Input() isForgot: boolean = false;

  @Input() min!: string;

  // @Input('value') value: any

  constructor() { }

  ngOnInit(): void { }

  get isValid() {
    return this.formGroup.controls[this.controlName].valid;
  }

  get isToucehd() {
    return this.formGroup.controls[this.controlName].touched;
  }

  get isDirty() {
    return this.formGroup.controls[this.controlName].dirty;
  }

  get hasErrors() {
    return this.formGroup.controls['errors'];
  }
}

