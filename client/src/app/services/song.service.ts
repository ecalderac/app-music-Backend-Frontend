import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Song } from '../models/song';

@Injectable()
export class SongService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //Metodo para añadir una nueva canción a la BD
    addSong(token, song:Song):Observable<any>{
        let params = JSON.stringify(song);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
      });

        return this._http.post(this.url+'song', params, { headers: headers });
    }


}