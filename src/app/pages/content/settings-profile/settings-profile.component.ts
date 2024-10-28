import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {User} from "../../../models/user";

@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule
  ],
  templateUrl: './settings-profile.component.html',
  styleUrl: './settings-profile.component.scss'
})
export class SettingsProfileComponent implements AfterViewInit{
  ELEMENT_DATA: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
