import {
  trigger, transition, style, animate, query, group
} from '@angular/animations';

export const slideVertical = trigger('routeAnimations', [
  transition('* <=> *', [
    // prepara enter/leave ocupando o mesmo espaço
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),

    // enter começa mais abaixo e totalmente invisível
    query(':enter', [
      style({ transform: 'translateY(100px)', opacity: 0 })
    ], { optional: true }),

    // anima leave e enter em paralelo, com tempo maior
    group([
      query(':leave', [
        animate(
          '800ms ease-in-out',
          style({ transform: 'translateY(-100px)', opacity: 0 })
        )
      ], { optional: true }),
      query(':enter', [
        animate(
          '800ms ease-in-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        )
      ], { optional: true })
    ])
  ])
]);
