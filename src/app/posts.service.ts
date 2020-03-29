import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostType } from './PostType.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
    loadedPosts: PostType[] = [];

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {

        const postData: PostType = { title: title, content: content };
        // Send Http request
        return this.http
            .post<{ name: string }>(
                'https://test-dae5f.firebaseio.com/posts.json',
                postData
            );
    }

    fetchPosts() {
        return this.http
            .get<{ [key: string]: PostType }>(
                'https://test-dae5f.firebaseio.com/posts.json')
            .pipe(map((responseData) => {
                const postsArray: PostType[] = [];

                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key))
                        postsArray.push({ ...responseData[key], id: key });
                }

                return postsArray;
            }),
                catchError((e) => {
                    console.log("caught error : " + e.error.error);
                    return throwError(e);
                }));
    }

    clearPosts() {
        return this.http.delete('https://test-dae5f.firebaseio.com/posts.json');
    }
}
