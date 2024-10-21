import {Component, ElementRef, OnInit, viewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {

  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Views',
          data: [100, 102, 105, 110, 115, 120, 125],
          borderColor: 'rgba(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: 'start'
        }]
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          }
        }
      }
    })
  }

}
