import {
  trigger, transition, style, animate, query, group
} from '@angular/animations';

export const zoomFade = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%' })
    ], { optional: true }),
    query(':leave', [
      style({ transform: 'scale(1)', opacity: 1 }),
      animate('300ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'scale(1.2)', opacity: 0 }),
      animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
    ], { optional: true })
  ])
]);
