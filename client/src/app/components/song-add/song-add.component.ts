import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from 'src/app/services/user.services';
import { SongService } from 'src/app/services/song.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  providers: [UserService, SongService]
})
export class SongAddComponent implements OnInit {
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage; 

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _songService: SongService
  ){
    this.titulo = 'Crear nueva canción';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1,'','','','');
   }

  ngOnInit() {
    console.log('componente song-add cargado');
  }

  onSubmit(){
    this._route.params.forEach((params:Params) => {
        let album_id = params['album'];
        this.song.album = album_id;
        console.log(this.song);
        
        this._songService.addSong(this.token, this.song).subscribe(
            response => {

              if(!response.song){
                this.alertMessage = "Error en el servidor";
              }else{
                this.alertMessage = "La canción se ha creado correctamente";
                this.song = response.song;
                //this._router.navigate(['/editar-album', response.album._id]);
              }
    
            },
            error =>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                this.alertMessage = error.error.message;
                console.log(error);
              }
            }
        );

    });
    
  }


}


