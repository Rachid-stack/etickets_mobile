import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent  implements OnInit {
  message: string | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 5000); // Masquer le message après 5 secondes (5000 ms)
    });
  }

}
