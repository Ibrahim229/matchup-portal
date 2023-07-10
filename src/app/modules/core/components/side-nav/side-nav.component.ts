import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  _menuItems!: any[]
  get menuItems(): any[] {
    return this._menuItems
  }
  @Input() set menuItems(value: any[]) {
    this._menuItems = value
  }
  constructor() { }

  ngOnInit(): void {
  }

}
