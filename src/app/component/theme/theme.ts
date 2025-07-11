import { Component } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './theme.html',
  styleUrl: './theme.css',
})
export class Theme {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
