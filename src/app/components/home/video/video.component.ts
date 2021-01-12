import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  urlVideo = 'https://www.youtube.com/embed/';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Video) {}

  ngOnInit(): void {
    this.urlVideo = this.urlVideo.concat(this.data.resourceId.videoId);
    console.log(this.urlVideo);
  }

  showVideo(video: Video): void {
    console.log(video);
  }
}
