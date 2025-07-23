import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ChallengeService } from '../../service/challenge.service';
import { Subscription } from 'rxjs';

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
  trigger('pageSlideFade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(40px)' }),
      animate(
        '1000ms ease-out',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'translateY(40px)' })
      ),
    ]),
  ]),



  trigger('diaToggle', [
    state('off', style({ opacity: 0.6, transform: 'scale(1)' })),
    state('on', style({ opacity: 1, transform: 'scale(1.12)' })),
    transition('off <=> on', animate('250ms ease-in-out')),
  ]),
]

})
export class ChallengeDetails implements OnInit, OnDestroy, AfterViewInit {
  desafios: Desafio[] = [];
  topBarButtons: TopBarButton[] = [];
  desafioSelecionado?: Desafio;
  diasRegistrados: number[] = [];
  diasFotos: { [dia: number]: string } = {};
  constructor(
    private route: ActivatedRoute,
    public themeService: ThemeService,
    public challengeService: ChallengeService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  private subscription = new Subscription();

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sub = this.challengeService.indexId(id).subscribe((desafio) => {
      this.desafioSelecionado = desafio;
    });
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  get duracaoArray(): number[] {
    return this.desafioSelecionado
      ? Array(this.desafioSelecionado.duracao_dias).fill(0)
      : [];
  }

  get progresso(): number {
    return this.desafioSelecionado
      ? Math.round(
          (Object.keys(this.diasFotos).length /
            this.desafioSelecionado.duracao_dias) *
            100
        )
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
        localStorage.setItem(
          `desafio_${this.desafioSelecionado?.id}_diasFotos`,
          JSON.stringify(this.diasFotos)
        );
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
  abrirDetalhe(id: number) {
    this.router.navigate(['/challenge-details', id]);
  }

  save() {}
}
