import { Component, OnInit } from '@angular/core';
interface MenuItem {

  nombre: string,
  ruta: string
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }`
  ]
})
export class MenuComponent implements OnInit {

  menuItem: MenuItem[] = [
    {
      nombre: 'Full Screen',
      ruta: '/mapas/full-screen'
    },
    {
      nombre: 'Zoom Range',
      ruta: '/mapas/zoom-range'
    },
    {
      nombre: 'Marcadores',
      ruta: '/mapas/marcadores'
    },
    {
      nombre: 'Propiedades',
      ruta: '/mapas/propiedades'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
