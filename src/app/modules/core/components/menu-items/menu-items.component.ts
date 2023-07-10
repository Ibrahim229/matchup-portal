import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  @Input() menuItem: any
  url!: string
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url
  }

  checkCurrentRoute(route: string): boolean {
    return this.url.includes(route)
  }

}
