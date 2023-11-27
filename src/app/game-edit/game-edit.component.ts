import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent {

  id: string = "";

  gameForm: FormGroup = this.fb.group({
    gameId: ['', Validators.required],
    title: ['', Validators.required],
    shortDescription: ['', Validators.required],
    description: ['', Validators.required],
    image: ['assets/images/placeholder.png', Validators.required],
    features: this.fb.array([
      this.fb.group({
        gameFeatureId: [''],
        gameId: [''],
        name: ['new feature'],
        description: ['description of feature'],
        image: ['assets/images/placeholder.png'],
      })
    ])
  });

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id') || "";
        return this.data.getOneGame(this.id);
      })
    ).subscribe(result => {
      console.log("the game: ", result);
      this.initForm(result);
    })
  }

  initForm(game: any): void {
    this.gameForm.patchValue({
      gameId: game.gameId,
      title: game.title,
      shortDescription: game.shortDescription,
      description: game.description,
      image: game.image,
      features: game.features

    })
  }

  submitForm(): void {
    console.log(this.gameForm.value);

    let game = {
      gameId: this.gameForm.value.gameId,
      title: this.gameForm.value.title,
      shortDescription: this.gameForm.value.shortDescription,
      description: this.gameForm.value.description,
      image: this.gameForm.value.image,
      features: this.gameForm.value.features
    }
    // if we are not editing we will create the game
    if (this.id == "") {
      this.data.createGame(game);
      this.router.navigate(['']);
    } else {
      // if we are editing
      this.data.updateGame(game);
      console.log("tryring to update game!");
      this.router.navigate(['games', game.gameId]);
    }


  }
}
