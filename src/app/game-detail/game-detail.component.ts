import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  id = "";

  game: any = {};

  constructor(private route: ActivatedRoute, private data: DataService) {

  }

  ngOnInit(): void {
    console.log('view is ready');

    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id')!;
        return this.data.getOneGame(this.id);
      })
    ).subscribe(ourGame => {
      this.game = ourGame;
    })

  }
}
