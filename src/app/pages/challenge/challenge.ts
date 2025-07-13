import { Component, OnInit } from '@angular/core';
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
import { ChallengeService } from '../../service/challenge.service';
import { TopBarButton } from '../../api/TopBarButton';
import { AppTopBar } from '../../component/app-top-bar/app-top-bar';

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
    AppTopBar
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
export class Challenge implements OnInit {
  constructor(public router: Router, public challengeService: ChallengeService) {}
  desafios: Desafio[] = [];
  topBarButtons: TopBarButton[] = [
    {
      label: 'Adicionar Desafio',
      icon: 'plus',
      type: 'primary',
      danger: true,
      action: () => this.router.navigate(['/challenge-create']),
    }
  ]
  ngOnInit() {
     this.challengeService.indexAll().subscribe((response) => {
     this.desafios = response.data; 
   
  });
  }
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
