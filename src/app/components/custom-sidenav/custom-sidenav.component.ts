import {Component, computed, Input, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";

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
    MatListItemTitle,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    console.log('collapsed', value);
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { icon: 'account_circle', label: 'Profile', route: 'profile' },
    { icon: 'settings', label: 'Settings', route: 'settings' },
  ])

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
