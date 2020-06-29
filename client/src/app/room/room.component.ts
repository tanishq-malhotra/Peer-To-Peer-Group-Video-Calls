import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @ViewChild('myVideo', { static: true }) public myVideo: ElementRef;
  // storing the socket
  public socket: any;

  // video constraints
  public videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  };

  constructor() {}

  ngOnInit(): void {
    navigator.mediaDevices
      .getUserMedia({ video: this.videoConstraints, audio: true })
      .then((stream: MediaStream) => {
        this.socket = io.connect('/');
        this.myVideo.nativeElement.srcObject = stream;
        this.myVideo.nativeElement.play();
      });
  }
}
