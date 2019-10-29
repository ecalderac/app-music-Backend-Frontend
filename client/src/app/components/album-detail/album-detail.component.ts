import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  providers: [UserService, AlbumService]
})
export class AlbumDetailComponent implements OnInit {
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage; 

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('componente album.detail cargado');
    //Sacar album de la Bd
    this.getAlbum();
  }

  getAlbum(){
    console.log("El metodo funciona");
    this._route.params.forEach((params: Params) => {
        let id = params['id'];

        this._albumService.getAlbum(this.token, id).subscribe(
            response => {
                if(!response.album){
                  this._router.navigate(['/']);
                }else{
                  this.album = response.album;

                  /*
                  //Sacar los albums del artista
                  this._albumService.getAlbums(this.token, response.artist._id).subscribe(
                    response => {
                      if(!response.albums){
                        this.alertMessage = 'Este artista no tiene albums';
                      }else{
                        this.albums = response.albums;
                      }     
                    },
                    error =>{
                      var errorMessage = <any>error;
                      if(errorMessage != null){
                        //this.alertMessage = error.error.message;
                        console.log(error);
                      }
                    });
                    */
                }
            },
            error =>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                //this.alertMessage = error.error.message;
                console.log(error);
              }
            }
        );

    });
  }

  


}


