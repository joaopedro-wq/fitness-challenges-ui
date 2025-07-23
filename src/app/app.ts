import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppTopBar } from './component/app-top-bar/app-top-bar';
import { Theme } from './component/theme/theme';
import { MenuItem } from './api/MenuItem';
import { ThemeService } from './service/theme.service';
import { TopBarButton } from './api/TopBarButton';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  stagger,
} from '@angular/animations';
import { slideVertical } from './animations/slideVertical';
import { smoothSlide } from './animations/smoothSlide';
import { slideHorizontal } from './animations/slideHorizontal';
import { fadeAnimation } from './animations/fadeAnimation';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    RouterOutlet,
    Theme,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [slideHorizontal  /* ou slideHorizontal, zoomFade */],
})
export class App {
  constructor(private router: Router, private themeService: ThemeService) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'];
  }

  isCollapsed = true;
  topBarButtons: TopBarButton[] = [
    {
      label: 'Novo',
      icon: 'plus',
      type: 'primary',
      action: () => this.createNew(),
    },
    {
      label: 'Atualizar',
      icon: 'reload',
      type: 'default',
      action: () => this.refresh(),
    },
  ];

  createNew() {
    console.log('Criar novo item...');
  }

  refresh() {
    console.log('Atualizando...');
  }

  toggleSider(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Configurações', icon: 'setting', route: '/outro' },
    { label: 'Challenges', icon: 'bulb', route: '/challenge' },
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  addMenuItem(item: MenuItem) {
    this.menuItems.push(item);
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }
  isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
