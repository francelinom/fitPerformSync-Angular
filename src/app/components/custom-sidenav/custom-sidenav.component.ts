import {Component, computed, Input, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MenuItemComponent} from "../menu-item/menu-item.component";

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
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
    MenuItemComponent,
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
    {
      icon: 'settings',
      label: 'Settings',
      route: 'content',
      subItems: [
        { icon: 'account_circle', label: 'Profile', route: 'configProfile' },
        { icon: 'lock', label: 'Security', route: 'security' },
        { icon: 'notifications', label: 'Notifications', route: 'notifications' },
      ]
    },
  ])

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
