import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  inputTitle = '';
  inputContent = '';
  @Output() postCreated = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onAddPost() {
    const post = {
      title: this.inputTitle,
      content: this.inputContent,
    };
    this.postCreated.emit(post);
  }
}
