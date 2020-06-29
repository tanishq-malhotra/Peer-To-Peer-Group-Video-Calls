import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path: '', component: CreateRoomComponent, pathMatch: 'full' },
  { path: 'room/:id', component: RoomComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
