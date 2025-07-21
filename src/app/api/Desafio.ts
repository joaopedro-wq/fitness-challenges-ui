export interface Desafio {
  id: number;
  titulo: string;
  descricao?: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  pontos_recompensa: number;
  duracao_dias: number;
  url_foto: string;
  metodo_pontuacao: 'duracao' | 'distancia' | 'calorias' | 'dias_ativos';
  meta_pontuacao?: number;
  created_at?: string;
  updated_at?: string;
 
}