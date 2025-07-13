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
  query,
  stagger,
} from '@angular/animations';
import { Desafio } from '../../api/Desafio';
import { AppTopBar } from '../../component/app-top-bar/app-top-bar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TopBarButton } from '../../api/TopBarButton';
import { ThemeService } from '../../service/theme.service';

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
    AppTopBar,
    NzLayoutModule,
  ],
  templateUrl: './challenge-details.html',
  styleUrls: ['./challenge-details.css'],
  animations: [
    trigger('staggerFadeIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px) scale(0.98)' }),
            stagger(480, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0) scale(1)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('diaToggle', [
      state('off', style({ opacity: 0.6, transform: 'scale(1)' })),
      state('on', style({ opacity: 1, transform: 'scale(1.15)' })),
      transition('off <=> on', animate('200ms ease-in-out')),
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
   topBarButtons: TopBarButton[] = [];
  desafioSelecionado?: Desafio;
  diasRegistrados: number[] = [];
  diasFotos: { [dia: number]: string } = {};
  constructor(private route: ActivatedRoute, public themeService: ThemeService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.desafioSelecionado = this.desafios.find((d) => d.id === id);

    // Carregar progresso salvo
    const saved = localStorage.getItem(`desafio_${id}_dias`);
    if (saved) {
      this.diasRegistrados = JSON.parse(saved);
    }
  }


  get duracaoArray(): number[] {
    return this.desafioSelecionado
      ? Array(this.desafioSelecionado.duracao_dias).fill(0)
      : [];
  }

  get progresso(): number {
    return this.desafioSelecionado
      ? Math.round((Object.keys(this.diasFotos).length / this.desafioSelecionado.duracao_dias) * 100)
      : 0;
  }

  formatProgresso = (percent: number) => `${percent.toFixed(0)}%`;

  
  ranking = [
    { nome: 'João', dias: 7, pontos: 100 },
    { nome: 'Ana', dias: 6, pontos: 90 },
    { nome: 'Carlos', dias: 5, pontos: 80 },
    { nome: 'Lúcia', dias: 4, pontos: 70 },
    { nome: 'Bruno', dias: 3, pontos: 60 },
  ];

  abrirCameraOuGaleria(dia: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.diasFotos[dia] = reader.result as string;
        localStorage.setItem(`desafio_${this.desafioSelecionado?.id}_diasFotos`, JSON.stringify(this.diasFotos));
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  isDiaRegistrado(dia: number): boolean {
    return !!this.diasFotos[dia];
  }

  isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
