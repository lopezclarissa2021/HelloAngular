import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cardList: any[] = [
    {
      title: "Card One",
      text: "This is a body of a card and I am making this up.",
      imgSrc: "https://fakeimg.pl/600x400"
    },
    {
      title: "Card Two",
      text: "This is a body of a card and I am making this up.",
      imgSrc: "https://fakeimg.pl/600x400"
    },
    {
      title: "Card Three",
      text: "This is a body of a card and I am making this up.",
      imgSrc: "https://fakeimg.pl/600x400"
    }
  ];

  games = this.data.games$;

  constructor(private data: DataService) {
    this.data.getAllGames();
  };
}

