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

    //Metodo para sacar todas las canciones de la BD
    getSongs(token, albumId = null):Observable<any>{ 
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        if(albumId == null){
            return this._http.get(this.url+'songs', { headers: headers });
        }else{
            return this._http.get(this.url+'songs/'+albumId, { headers: headers });
        }

    }

    //Metodo para sacar una cancion de la BD
    getSong(token, id: string):Observable<any>{ 
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        return this._http.get(this.url+'song/'+id, { headers: headers });
    }

    //Metodo para añadir una nueva canción a la BD
    addSong(token, song:Song):Observable<any>{
        let params = JSON.stringify(song);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
      });

        return this._http.post(this.url+'song', params, { headers: headers });
    }

    //Metodo para añadir una nueva canción a la BD
    editSong(token, id:string, song:Song):Observable<any>{
        let params = JSON.stringify(song);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        return this._http.put(this.url+'song/'+id, params, { headers: headers });
    }

    //Metodo eliminar una cancion de la BD
    deleteSong(token, id: string):Observable<any>{ 
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        return this._http.delete(this.url+'song/'+id, { headers: headers });
    }


}