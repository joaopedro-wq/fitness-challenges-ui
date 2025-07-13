import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TopBarButton } from '../../api/TopBarButton';
import { NzCardModule } from 'ng-zorro-antd/card';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzCardModule],
  templateUrl: './app-top-bar.html',
  styleUrls: ['./app-top-bar.css'],
})
export class AppTopBar {
  @Input() buttons: TopBarButton[] = [];

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
