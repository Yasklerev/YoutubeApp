import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';

import { MatDialog } from '@angular/material/dialog';

// Video Dialog
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(
    private youtubeService: YoutubeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.youtubeService.getVideos().subscribe(
      (data) => {
        this.videos.push(...data);
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  openDialog(video: Video): void {
    this.dialog.open(VideoComponent, { data: video });
  }
}
