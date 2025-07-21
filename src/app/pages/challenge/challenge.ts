import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { ChallengeService } from '../../service/challenge.service';
import { Desafio } from '../../api/Desafio';
import { TopBarButton } from '../../api/TopBarButton';
import { AppTopBar } from '../../component/app-top-bar/app-top-bar';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  query,
  stagger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, NzIconModule, AppTopBar, NzCardModule],
  templateUrl: './challenge.html',
  styleUrls: ['./challenge.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeSlideInDelayed', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '500ms 500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ), // 300ms delay
      ]),
    ]),
    trigger('staggerCards', [
      transition(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate(
            '500ms {{delay}} ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ],
        { params: { delay: '0ms' } }
      ),
    ]),
    trigger('fadeSlideScaleItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class Challenge implements OnInit, OnDestroy {
  desafios: Desafio[] = [];
  private desafiosSubscription?: Subscription;

  topBarButtons: TopBarButton[] = [
    {
      label: 'Adicionar Desafio',
      icon: 'plus',
      type: 'primary',
      danger: true,
      action: () => this.router.navigate(['/challenge-create']),
    },
  ];

  constructor(
    public router: Router,
    public challengeService: ChallengeService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.desafiosSubscription = this.challengeService.indexAll().subscribe({
      next: (response) => {
        this.desafios = [...response.data];
      },
      error: (error) => {
        console.error('Erro ao carregar desafios:', error);
      },
    });
  }

  ngOnDestroy() {
    this.desafiosSubscription?.unsubscribe();
    this.cardsAnimationStart = false;
  }

  abrirDetalhe(id: number) {
    this.router.navigate(['/challenge-details', id]);
  }

  isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
  cardsAnimationStart = false;

  onSubtitleAnimationDone() {
    this.cardsAnimationStart = true;
  }
}
