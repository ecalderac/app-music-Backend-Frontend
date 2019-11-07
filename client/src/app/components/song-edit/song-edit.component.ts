import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from 'src/app/services/user.services';
import { UploadService } from 'src/app/services/upload.service';
import { SongService } from 'src/app/services/song.service';
import { Song } from '../../models/song';


@Component({
  selector: 'app-song-edit',
  templateUrl: '../song-add/song-add.component.html', 
  styleUrls: ['../song-add/song-add.component.css'],
  providers: [UserService, SongService, UploadService]
})
export class SongEditComponent implements OnInit {
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage; 
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _songService: SongService
  ){
    this.titulo = 'Editar canción';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1,'','','','');
    this.is_edit = true;
   }

  ngOnInit() {
    console.log('componente song-edit cargado');

    this.getSong();
  }

  getSong(){
    this._route.params.forEach((params:Params) => {
        let id = params['id'];

        this._songService.getSong(this.token, id).subscribe(
            response => {
              if(!response.song){
                this._router.navigate(['/']);
              }else{
                this.song = response.song;
              }
            },
            error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                //this.alertMessage = error.error.message;
                console.log(error);
              }
            }

        );
    });
  }

  onSubmit(){
    this._route.params.forEach((params:Params) => {
        let id = params['id'];
        
        this._songService.editSong(this.token, id, this.song).subscribe(
            response => {

              if(!response.song){
                this.alertMessage = "Error en el servidor";
              }else{
                this.alertMessage = "La canción se ha actualizado correctamente";
                
                if(!this.filesToUpload){
                  this._router.navigate(['/album', response.song.album]);
                }else{
                  //Subir el fichero de audio
                  this._uploadService.makeFileRequest(this.url+'upload-file-song/'+id, [], this.filesToUpload, this.token, 'file')
                  .then(
                      (result) => {
                          this._router.navigate(['/album', response.song.album]);
                      },
                      (error) =>{
                          console.log(error);
                      }
                    );
                } 
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

  public filesToUpload;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
