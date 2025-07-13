import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Desafio } from '../api/Desafio';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../api/PaginatedResponse';



@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private baseUrl = `${environment.apiBaseUrl}/desafios`;

  constructor(private http: HttpClient) {}

  // Listar todos os desafios (sem paginação)
 indexAll(): Observable<PaginatedResponse<Desafio>> {
  return this.http.get<PaginatedResponse<Desafio>>(`${this.baseUrl}/all`);
}

  index(filters?: { dificuldade?: string; metodo_pontuacao?: string; titulo?: string }, page: number = 1) {
    let params = new HttpParams().set('page', page.toString());
    if (filters) {
      if (filters.dificuldade) params = params.set('dificuldade', filters.dificuldade);
      if (filters.metodo_pontuacao) params = params.set('metodo_pontuacao', filters.metodo_pontuacao);
      if (filters.titulo) params = params.set('titulo', filters.titulo);
    }
    return this.http.get<any>(this.baseUrl, { params }); 
  }

 
  indexId(id: number): Observable<Desafio> {
    return this.http.get<Desafio>(`${this.baseUrl}/${id}`);
  }

 
  store(data: {
    titulo: string;
    descricao?: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    pontos_recompensa: number;
    duracao_dias: number;
    metodo_pontuacao: 'duracao' | 'distancia' | 'calorias' | 'dias_ativos';
    meta_pontuacao?: number;
    url_foto?: File;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    if (data.descricao) formData.append('descricao', data.descricao);
    formData.append('dificuldade', data.dificuldade);
    formData.append('pontos_recompensa', data.pontos_recompensa.toString());
    formData.append('duracao_dias', data.duracao_dias.toString());
    formData.append('metodo_pontuacao', data.metodo_pontuacao);
    if (data.meta_pontuacao !== undefined) formData.append('meta_pontuacao', data.meta_pontuacao.toString());
    if (data.url_foto) formData.append('url_foto', data.url_foto);

    return this.http.post(this.baseUrl, formData);
  }

 
  update(id: number, data: {
    titulo?: string;
    descricao?: string;
    dificuldade?: 'facil' | 'medio' | 'dificil';
    pontos_recompensa?: number;
    duracao_dias?: number;
    metodo_pontuacao?: 'duracao' | 'distancia' | 'calorias' | 'dias_ativos';
    meta_pontuacao?: number;
    url_foto?: File;
  }): Observable<any> {
    const formData = new FormData();

    if (data.titulo) formData.append('titulo', data.titulo);
    if (data.descricao) formData.append('descricao', data.descricao);
    if (data.dificuldade) formData.append('dificuldade', data.dificuldade);
    if (data.pontos_recompensa !== undefined) formData.append('pontos_recompensa', data.pontos_recompensa.toString());
    if (data.duracao_dias !== undefined) formData.append('duracao_dias', data.duracao_dias.toString());
    if (data.metodo_pontuacao) formData.append('metodo_pontuacao', data.metodo_pontuacao);
    if (data.meta_pontuacao !== undefined) formData.append('meta_pontuacao', data.meta_pontuacao.toString());
    if (data.url_foto) formData.append('url_foto', data.url_foto);

    // Laravel aceita método PUT via POST + _method=PUT
    formData.append('_method', 'PUT');

    return this.http.post(`${this.baseUrl}/${id}`, formData);
  }

 
  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
