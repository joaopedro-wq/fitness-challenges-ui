import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Theme } from '../theme/theme';
import { ThemeService } from '../../service/theme.service';
import { MenuItem } from '../../api/MenuItem';
import { TopBarButton } from '../../api/TopBarButton';
import { AppTopBar } from '../app-top-bar/app-top-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  constructor(private router: Router, private themeService: ThemeService) {}
  isCollapsed = false;
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
    { label: 'Challenges', icon: 'team', route: '/challenge' },
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
