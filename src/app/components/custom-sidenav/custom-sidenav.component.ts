import {Component, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatNavList,
    MatIcon,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {
  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'account_circle', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ])
}
