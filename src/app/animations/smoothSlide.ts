import {
  trigger, transition, style, animate, query, group,
  keyframes
} from '@angular/animations';

export const smoothSlide = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
    ], { optional: true }),

    group([
      // sai levemente para esquerda e some
      query(':leave', [
        animate('400ms cubic-bezier(0.22,1,0.36,1)', keyframes([
          style({ transform: 'translateX(0%)', opacity: 1, offset: 0 }),
          style({ transform: 'translateX(-30%)', opacity: 0.7, offset: 0.4 }),
          style({ transform: 'translateX(-100%)', opacity: 0, offset: 1 })
        ]))
      ], { optional: true }),

      // entra com overshoot da direita
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.22,1,0.36,1)', keyframes([
          style({ transform: 'translateX(100%)', opacity: 0, offset: 0 }),
          style({ transform: 'translateX(-10%)', opacity: 1, offset: 0.7 }),
          style({ transform: 'translateX(0%)', opacity: 1, offset: 1 })
        ]))
      ], { optional: true })
    ])
  ])
]);
