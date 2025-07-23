import {
  trigger, transition, style, animate, query, group
} from '@angular/animations';

export const slideHorizontal =trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),

    group([
      // Animação de saída
      query(':leave', [
        animate('800ms ease-in-out', style({ opacity: 0, transform: 'scale(0.97)' }))
      ], { optional: true }),

      // Animação de entrada
      query(':enter', [
        style({ opacity: 0, transform: 'scale(1.03)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
      ], { optional: true })
    ])
  ])
]);