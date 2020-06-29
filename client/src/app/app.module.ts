import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [AppComponent, CreateRoomComponent, RoomComponent, VideoComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
