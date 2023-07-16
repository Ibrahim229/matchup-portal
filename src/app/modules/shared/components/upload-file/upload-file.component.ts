import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Url } from '../../_models/url.enum';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadFileComponent,
      multi: true,
    },
  ],
})
export class UploadFileComponent implements OnInit {
  @Input() singleFile = true;
  @Input() allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];
  @ViewChild('fileDropRef') fileDropRef!: ElementRef;
  @Input() label!: string;
  @Input() canAccept = 'image/*';
  @Input() editMode = false;
  @Output() onRemoveAttachment: EventEmitter<any> = new EventEmitter();
  @Input() oldAttachments: any[] = []; // attachment that is saved at backend and returned with the service response
  @Output() onAttachmentChange: EventEmitter<any> = new EventEmitter();
  message!: string;
  fileUrl: any;
  selectedFiles: any[] = [];
  previews: string[] = [];
  fileType!: string;
  errorType = '';
  @Input('formGroup') formGroup!: FormGroup;
  @Input('formControl') formControl!: FormControl;
  addedAttachments: any[] = [];
  @Output() onAppendAttachments: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  checkType(file: File | any) {
    this.fileType = file.type.split('/').pop().toLowerCase();
    if (this.allowedTypes.includes(this.fileType)) {
      this.errorType = '';
      return true;
    } else {
      this.errorType = 'notAllowedType';
      return false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.editMode) {
      if (changes['oldAttachments'].previousValue !== undefined) {
        if (
          changes['oldAttachments'].previousValue !==
          changes['oldAttachments'].currentValue
        ) {
          if (this.oldAttachments) {
            this.selectedFiles = this.oldAttachments;
            if (this.singleFile) {
              this.fileUrl = this.oldAttachments[0];
            }
          }
        }
      }
    }
  }

  checkFile(file: any) {
    if (!file.type) {
      const fileType = file.attachment.split('.')[1];
      if (fileType !== 'pdf') {
        return true;
      } else {
        return false;
      }
    } else {
      if (file.type !== 'application/pdf') {
        return true;
      } else {
        return false;
      }
    }
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}

  onFileSelected(event: any, type: number) {
    if (this.singleFile === true) {
      this.selectedFiles = [];
      let isFileValid = {};
      if (type === 1) {
        for (let index of event) {
          this.selectedFiles.push(index);
          isFileValid = this.checkType(event['0']);
        }
      } else {
        this.selectedFiles = event.target.files;
        if (this.selectedFiles.length) {
          isFileValid = this.checkType(event.target.files[0]);
        } else {
          this.fileUrl = '';
        }
      }
      if (this.selectedFiles.length && isFileValid) {
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFiles[0]);
        reader.onload = (_event) => {
          if (this.selectedFiles[0].type === 'application/pdf') {
            this.fileUrl = 'assets/images/pdf-svg.svg';
          } else {
            this.fileUrl = reader.result;
          }
        };
      }
    } else {
      if (type === 1) {
        this.selectedFiles = event;
      } else {
        if (event.target.files.length > 0) {
          if (this.oldAttachments.length > 0) {
            Array.from(event.target.files).forEach((file: any) => {
              this.addedAttachments.push(file);
            });
            this.selectedFiles = this.selectedFiles.concat(
              this.addedAttachments
            );
          } else {
            this.selectedFiles = [];
            Array.from(event.target.files).forEach((file: any) => {
              this.selectedFiles.push(file);
            });
          }
        }
      }
    }
    this.onAppendAttachments.emit(this.addedAttachments);
    this.onAttachmentChange.emit(this.selectedFiles);
    this.formControl?.markAsTouched();
    this.formControl?.markAsDirty();
    this.formControl?.setValue(this.selectedFiles);
  }

  emitValidFiles() {
    this.onAttachmentChange.emit(this.selectedFiles);
  }

  handleRemoveFile(index: number) {
    const itemToDelete = this.selectedFiles[index];
    if (itemToDelete.name) {
      this.selectedFiles.splice(index, 1);
      const addedIndex = this.addedAttachments.findIndex(
        (attachment) => attachment.name === itemToDelete.name
      );
      this.addedAttachments.splice(addedIndex, 1);
      this.onAppendAttachments.emit(this.addedAttachments);
    } else {
      this.onRemoveAttachment.emit({ index: index, item: itemToDelete });
    }
    this.onAttachmentChange.emit(this.selectedFiles);

    // this.onAttachmentChange.emit(this.selectedFiles);

    // if (this.singleFile) {
    //   this.fileDropRef.nativeElement.value = '';
    //   this.fileUrl = '';
    // } else {
    //   if (this.selectedFiles[index].id) {
    //     this.onRemoveAttachment.emit({
    //       index: index,
    //       attachmentId: this.selectedFiles[index]?.id,
    //     });
    //   } else {
    //     const fileListArr = Array.from(this.selectedFiles);
    //     fileListArr.splice(index, 1);
    //     this.selectedFiles = fileListArr;
    //     this.onAttachmentChange.emit(this.selectedFiles);
    //   }
    // }
    // !this.selectedFiles.length && this.formControl?.reset();
    this.formControl?.markAsTouched();
    this.formControl?.markAsDirty();
  }

  get Url() {
    return Url;
  }
}
