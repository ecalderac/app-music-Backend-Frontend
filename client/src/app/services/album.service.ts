import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    getAlbums(token, artistId = null):Observable<any>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        if(artistId == null){
            return this._http.get(this.url+'albums', { headers: headers });
        }else{
            return this._http.get(this.url+'albums/'+artistId, { headers: headers });
        }

    }

    //Metodo para obtener un Album de la BD
    getAlbum(token, id:string):Observable<any>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
      });

      return this._http.get(this.url+'album/'+id, { headers: headers });
    }

    //Metodo para añadir un nuevo album a la BD
    addAlbum(token, album:Album):Observable<any>{
        let params = JSON.stringify(album);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
      });

        return this._http.post(this.url+'album', params, { headers: headers });
    }

    //Metodo para ediatr un album en la BD
    editAlbum(token, id:string, album:Album):Observable<any>{
        let params = JSON.stringify(album);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        return this._http.put(this.url+'album/'+id, params, { headers: headers });
    }

    //Metodo para eliminar un Album de la BD
    deleteAlbum(token, id:string):Observable<any>{
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        return this._http.delete(this.url+'album/'+id, { headers: headers });
    }

}