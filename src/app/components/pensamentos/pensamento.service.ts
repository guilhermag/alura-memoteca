import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API_URL = 'http://localhost:3000/pensamentos';
  constructor(private http: HttpClient) {}

  listar(
    pagina: number,
    filtro: string,
    favoritos: boolean
  ): Observable<Pensamento[]> {
    const itensPagina = 3;
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPagina);

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }

    if (favoritos) {
      params = params.set('favorito', true);
    }
    return this.http.get<Pensamento[]>(this.API_URL, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API_URL, pensamento);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API_URL}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API_URL}/${pensamento.id}`;
    pensamento.favorito = !pensamento.favorito;
    return this.http.put<Pensamento>(url, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<Pensamento>(url);
  }
}
