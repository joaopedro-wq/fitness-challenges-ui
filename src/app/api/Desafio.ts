export interface Desafio {
    id: number;
  titulo: string;
  descricao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  pontos_recompensa: number;
  duracao_dias: number;
}