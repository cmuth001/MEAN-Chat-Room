import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
// posts = [
//   {title: 'First post', content: 'this is first\'s post content'},
//   {title: 'Second post', content: 'this is Second\'s post content'},
//   {title: 'Third post', content: 'this is Third\'s post content'},
//   {title: 'Fourth post', content: 'this is Fourth\'s post content'}
// ];
@Input() posts = [];
}
