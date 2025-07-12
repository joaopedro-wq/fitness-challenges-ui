import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Desafio } from '../../api/Desafio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzTypographyModule,
    NzIconModule,
  ],
  templateUrl: './challenge.html',
  styleUrl: './challenge.css',
  animations: [
    trigger('staggerFadeScale', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
            stagger(300, [
              animate(
                '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                style({
                  opacity: 1,
                  transform: 'scale(1) translateY(0)',
                })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class Challenge {
  constructor(public router: Router) {}
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

  getDificuldadeIcon(dificuldade: string): string {
    switch (dificuldade) {
      case 'facil':
        return 'smile';
      case 'medio':
        return 'meh';
      case 'dificil':
        return 'frown';
      default:
        return 'question';
    }
  }

  abrirDetalhe(id: number) {
    this.router.navigate(['/challenge-details', id]);
  }
}
