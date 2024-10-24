import {computed, effect, Injectable, signal} from '@angular/core';
import {SubscribersComponent} from "../pages/dashboard/widgets/subscribers/subscribers.component";
import {Widget} from "../models/dashboard";
import {ViewsComponent} from "../pages/dashboard/widgets/views/views.component";
import {WatchTimeComponent} from "../pages/dashboard/widgets/watch-time/watch-time.component";
import {RevenueComponent} from "../pages/dashboard/widgets/revenue/revenue.component";
import {AnalyticsComponent} from "../pages/dashboard/widgets/analytics/analytics.component";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 2,
      columns: 2,
      backgroundColor: '#003f5c',
      color: '#fff'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      backgroundColor: '#47b1e3',
      color: '#fff'
    },
    {
      id: 3,
      label: 'Watch Time',
      content: WatchTimeComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: '#fff'
    },
    {
      id: 4,
      label: 'Revenue',
      content: RevenueComponent,
      backgroundColor: '#47b1e3',
      color: '#fff'
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2,
    }
  ])

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: '#fff'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#47b1e3',
      color: '#fff'
    },
    {
      id: 3,
      label: 'Watch Time',
      content: WatchTimeComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: '#fff'
    },
    {
      id: 4,
      label: 'Revenue',
      content: RevenueComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#47b1e3',
      color: '#fff'
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2,
    }
  ]);

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

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id));
  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      })

      this.addedWidgets.set(widgets);
    }
  }

  constructor() {
    this.fetchWidgets();
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({...w}));
    widgetsWithoutContent.forEach(w => {
      delete w.content
    });
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent));
  });
}
