import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit {
  public createRoomForm: FormGroup;

  public createRoom(): void {
    const roomName: string = this.createRoomForm.get('roomName').value;

    if (roomName.length) {
      this.router.navigate(['room', roomName]);
    } else alert('Enter room name');
  }
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.createRoomForm = new FormGroup({ roomName: new FormControl('') });
  }
}
