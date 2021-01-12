import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, Video, YoutubeResponse } from '../models/youtube.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl = 'https://youtube.googleapis.com/youtube/v3';
  private apiKey = '';
  private playlist = '';
  private nextPageToken = '';

  constructor(private httpClient: HttpClient) {}

  getVideos(): Observable<Video[]> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken);

    const url = `${this.youtubeUrl}/playlistItems`;

    return this.httpClient
      .get<YoutubeResponse>(url, { params })
      .pipe(
        map((data) => {
          this.nextPageToken = data.nextPageToken;
          return data.items;
        }),
        map((data) => {
          return data.map((video) => video.snippet);
        })
      );
  }
}
