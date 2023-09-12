import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent {
  @Input() pdfSrc: string = '';
}
