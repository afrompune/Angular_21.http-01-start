import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostType } from './PostType.model';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  errorMsg = null;

  constructor(private http: HttpClient,
    private postSvc: PostService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostType) {
    this.postSvc.createAndStorePost(postData.title, postData.content)
      .subscribe(responseData => {
        console.log(responseData);
        this.fetchPosts();
      });
    ;
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    if (confirm("Are you sure to clear posts ?")) {
      this.postSvc.clearPosts().subscribe((responseData) => {
        this.loadedPosts = [];
      }
      );
    }
  }

  private fetchPosts() {
    this.isFetching = true;
    this.errorMsg = null;

    this.postSvc.fetchPosts().subscribe((data) => {
      console.log(data);
      this.isFetching = false;
      this.loadedPosts = data;
    }, error => {
      console.log(error);
      this.errorMsg = error.error.error;
    });

  }

  ngOnDestroy() {
  }
}
