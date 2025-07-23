import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

export const fadeAnimation = trigger('routeAnimations', [
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
      query(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { optional: true })
    ])
  ])
]);
