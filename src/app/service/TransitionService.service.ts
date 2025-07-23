import { Injectable } from '@angular/core';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransitionService {
  constructor(private router: Router) {}

  setupTransition(handler: (url: string) => Promise<void>) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(async (event: RouterEvent) => {
        const navEvent = event as NavigationStart;

        // cancela a navegação imediatamente
        history.pushState(null, '', navEvent.url); // trava a URL
        await handler(navEvent.url); // executa animação de saída
        this.router.navigateByUrl(navEvent.url); // navega manualmente após animação
      });
  }
}
