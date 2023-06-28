import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  transcript: string = '';
  listening = false; // Initialize the property with false

  ngOnInit() {
    this.transcript = '';
    this.startListening();
  }

  startListening() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;

      this.transcript = transcript;
    };

    recognition.onend = () => {
      this.listening = false;
    };

    setTimeout(() => {
      recognition.stop();
    }, 10000);

    this.listening = true;
  }
}