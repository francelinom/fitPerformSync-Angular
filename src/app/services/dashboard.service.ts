import {computed, Injectable, signal} from '@angular/core';
import {SubscribersComponent} from "../pages/dashboard/widgets/subscribers/subscribers.component";
import {Widget} from "../models/dashboard";
import {ViewsComponent} from "../pages/dashboard/widgets/views/views.component";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Widget 1',
      content: SubscribersComponent,
      rows: 2,
      columns: 2
    },
    {
      id: 2,
      label: 'View',
      content: ViewsComponent,
    }
  ])

  addedWidgets = signal<Widget[]>([]);

  widgestToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((widget) => widget.id);
    return this.widgets().filter((widget) => !addedIds.includes(widget.id));
  });

  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), {...w}]);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = {...newWidgets[index], ...widget};
      this.addedWidgets.set(newWidgets);
    }
  }

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === this.addedWidgets().length - 1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{...newWidgets[index + 1]}, {...newWidgets[index]}];

    this.addedWidgets.set(newWidgets);
  }

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === 0) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{...newWidgets[index - 1]}, {...newWidgets[index]}];

    this.addedWidgets.set(newWidgets);
  }

  constructor() {
  }
}
