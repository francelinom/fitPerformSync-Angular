import {Component, inject, input, model, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {Widget} from "../../../models/dashboard";
import {DashboardService} from "../../../services/dashboard.service";

@Component({
  selector: 'app-widget-options',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.scss'
})
export class WidgetOptionsComponent {

  data = input.required<Widget>();
  showOptions = model<boolean>(false);
  store = inject(DashboardService);

}
