import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { Desafio } from '../../api/Desafio';

@Component({
  selector: 'app-challenge-details',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzProgressModule,
    NzTagModule,
  ],
  templateUrl: './challenge-details.html',
  styleUrls: ['./challenge-details.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('diaToggle', [
      state('off', style({ opacity: 0.6, transform: 'scale(1)' })),
      state('on', style({ opacity: 1, transform: 'scale(1.15)' })),
      transition('off <=> on', animate('250ms ease-in-out')),
    ]),
    trigger('checkFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.5)' })),
      ]),
    ]),
  ],
})
export class ChallengeDetails implements OnInit {
  desafios: Desafio[] = [
    {
      id: 1,
      titulo: 'Caminhada de 5km',
      descricao: 'Complete 5km de caminhada durante a semana.',
      dificuldade: 'facil',
      pontos_recompensa: 10,
      duracao_dias: 7,
    },
    {
      id: 2,
      titulo: '100 abdominais',
      descricao: 'Faça 100 abdominais em um dia.',
      dificuldade: 'medio',
      pontos_recompensa: 20,
      duracao_dias: 1,
    },
    {
      id: 3,
      titulo: 'Corrida de 10km',
      descricao: 'Corra 10km em uma semana.',
      dificuldade: 'dificil',
      pontos_recompensa: 50,
      duracao_dias: 7,
    },
    {
      id: 4,
      titulo: 'Yoga 30 min',
      descricao: 'Pratique yoga por 30 minutos por 3 dias.',
      dificuldade: 'facil',
      pontos_recompensa: 15,
      duracao_dias: 3,
    },
    {
      id: 5,
      titulo: 'Treino HIIT',
      descricao: 'Realize 3 treinos HIIT na semana.',
      dificuldade: 'medio',
      pontos_recompensa: 30,
      duracao_dias: 7,
    },
  ];

  desafioSelecionado?: Desafio;
  diasRegistrados: number[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.desafioSelecionado = this.desafios.find((d) => d.id === id);

    // Carregar progresso salvo
    const saved = localStorage.getItem(`desafio_${id}_dias`);
    if (saved) {
      this.diasRegistrados = JSON.parse(saved);
    }
  }

  registrarDia(dia: number) {
    if (this.diasRegistrados.includes(dia)) {
      this.diasRegistrados = this.diasRegistrados.filter((d) => d !== dia);
    } else {
      this.diasRegistrados.push(dia);
    }

    // Salvar progresso no localStorage
    if (this.desafioSelecionado) {
      localStorage.setItem(
        `desafio_${this.desafioSelecionado.id}_dias`,
        JSON.stringify(this.diasRegistrados)
      );
    }
  }

  isDiaRegistrado(dia: number): boolean {
    return this.diasRegistrados.includes(dia);
  }

  get duracaoArray(): number[] {
    if (!this.desafioSelecionado) return [];
    return Array(this.desafioSelecionado.duracao_dias).fill(0);
  }

  get progresso(): number {
    if (!this.desafioSelecionado) return 0;
    return (
      (this.diasRegistrados.length / this.desafioSelecionado.duracao_dias) * 100
    );
  }

  formatProgresso = (percent: number) => `${percent.toFixed(0)}%`;

  getDifficultyClass(dificuldade?: string): string {
  switch ((dificuldade || '').toLowerCase()) {
    case 'fácil':
    case 'facil':
      return 'difficulty-easy';
    case 'médio':
    case 'medio':
      return 'difficulty-medium';
    case 'difícil':
    case 'dificil':
      return 'difficulty-hard';
    default:
      return '';
  }
}
getDifficultyIcon(dificuldade?: string): string {
  switch ((dificuldade || '').toLowerCase()) {
    case 'fácil':
    case 'facil':
      return 'smile';
    case 'médio':
    case 'medio':
      return 'meh';
    case 'difícil':
    case 'dificil':
      return 'frown';
    default:
      return 'question-circle';
  }
}


}
