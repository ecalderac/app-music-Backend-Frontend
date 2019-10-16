import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //Metodo para obtener todos los artistas de la BD
    getArtists(token, page):Observable<any>{

        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });
        
        return this._http.get(this.url+'artists/'+page, {headers:headers}); 
        
    }

    //Metodo para obtener un artista especifico de la BD
    getArtist(token, id:string):Observable<any>{

        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });
        
        return this._http.get(this.url+'artist/'+id, {headers:headers}); 
        
    }

    //Metodo para añadir un nuevo artista a la BD(funciona)
    addArtist(token, artist:Artist):Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
      });

        return this._http.post(this.url+'artist', params, { headers: headers });
    }

    //Metodo para editar un artista en la BD
    editArtist(token, id:string, artist:Artist):Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });

        return this._http.put(this.url+'artist/'+id, params, { headers: headers });
    }

    //Metodo para eliminar un artista especifico de la BD
    deleteArtist(token, id:string):Observable<any>{

        let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': token
        });
        
        return this._http.delete(this.url+'artist/'+id, {headers:headers}); 
        
    }

}