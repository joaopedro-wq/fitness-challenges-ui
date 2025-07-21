import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './upload-image.html',
  styleUrls: ['./upload-image.css'],
})
export class UploadImageComponent {
  constructor(private themeService: ThemeService) {}
  @Output() fileSelected = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isDragging = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.setFile(input.files[0]);
    }
  }

  setFile(file: File) {
    this.selectedFile = file;
    this.fileSelected.emit(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      this.setFile(event.dataTransfer.files[0]);
    }
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.previewUrl = null;
    this.fileInput.nativeElement.value = '';
  }

  isImage(): boolean {
    return !!this.selectedFile && this.selectedFile.type.startsWith('image/');
  }

  isVideo(): boolean {
    return !!this.selectedFile && this.selectedFile.type.startsWith('video/');
  }

  isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
