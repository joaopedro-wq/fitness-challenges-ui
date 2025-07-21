import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppTopBar } from '../../component/app-top-bar/app-top-bar';
import { TopBarButton } from '../../api/TopBarButton';
import { ChallengeService } from '../../service/challenge.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadImageComponent } from '../../component/upload-image/upload-image';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-challenge-form',
  standalone: true,
  imports: [
    CommonModule,
    AppTopBar,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzCardModule,
    NzUploadModule,
    ReactiveFormsModule,
    NzGridModule,
    UploadImageComponent,
    NzFormModule,
  ],
  templateUrl: './challenge-form.html',
  styleUrl: './challenge-form.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // quando o componente entrar na tela
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // quando o componente sair da tela
        animate('400ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('40ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })),
      ]),
    ]),
    trigger('flip', [
      transition(':enter', [
        style({ transform: 'rotateY(90deg)', opacity: 0 }),
        animate(
          '1000ms ease-out',
          style({ transform: 'rotateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms ease-in',
          style({ transform: 'rotateY(90deg)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('scaleInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate(
          '1000ms ease-out',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'scale(0.8)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query(
          '.ant-col',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(550, [
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ChallengeForm implements OnInit {
  form!: FormGroup;
  loading = false;
  Validators = Validators;

  topBarButtons: TopBarButton[] = [
    {
      label: 'Salvar',
      icon: 'save',
      type: 'primary',
      action: () => this.save(),
    },
  ];

  formFields = [
    {
      id: 'titulo',
      label: 'Título',
      type: 'input',
      formControlName: 'titulo',
      placeholder: 'Título do desafio',
    },
    {
      id: 'dificuldade',
      label: 'Dificuldade',
      type: 'select',
      formControlName: 'dificuldade',
      placeholder: 'Selecione a dificuldade',
      options: [
        { label: 'Fácil', value: 'facil' },
        { label: 'Médio', value: 'medio' },
        { label: 'Difícil', value: 'dificil' },
      ],
    },
    {
      id: 'pontos_recompensa',
      label: 'Pontos de recompensa',
      type: 'input',
      formControlName: 'pontos_recompensa',
      inputType: 'number',
      placeholder: '',
    },
    {
      id: 'duracao_dias',
      label: 'Duração (dias)',
      type: 'input',
      formControlName: 'duracao_dias',
      inputType: 'number',
      placeholder: '',
    },
    {
      id: 'metodo_pontuacao',
      label: 'Método de Pontuação',
      type: 'select',
      formControlName: 'metodo_pontuacao',
      placeholder: 'Selecione o método',
      options: [
        { label: 'Duração', value: 'duracao' },
        { label: 'Distância', value: 'distancia' },
        { label: 'Calorias', value: 'calorias' },
        { label: 'Dias Ativos', value: 'dias_ativos' },
      ],
    },
    {
      id: 'meta_pontuacao',
      label: 'Meta de Pontuação',
      type: 'input',
      formControlName: 'meta_pontuacao',
      inputType: 'number',
      placeholder: '',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      dificuldade: ['facil', Validators.required],
      pontos_recompensa: [, [Validators.required, Validators.min(1)]],
      duracao_dias: [, [Validators.required, Validators.min(1)]],
      metodo_pontuacao: [, Validators.required],
      meta_pontuacao: [null],
      url_foto: [null],
    });

    Object.values(this.form.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }

  save() {
    if (this.form.invalid) {
      this.message.warning('Preencha os campos obrigatórios.');
      return;
    }

    const formValue = { ...this.form.value };

    if (this.selectedFile) {
      formValue.url_foto = this.selectedFile;
    }

    this.loading = true;

    this.challengeService.store(formValue).subscribe({
      next: () => {
        this.loading = false;
        this.message.success('Desafio cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.message.error('Erro ao cadastrar desafio!');
      },
    });
  }

  selectedFile: File | null = null;
  onFileSelected(file: File) {
    this.selectedFile = file;
  }
}
