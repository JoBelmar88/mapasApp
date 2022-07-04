import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('map') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  lat: number = -73.11445148646999;
  lng: number = -36.77574996278295;
  center: [number, number] = [this.lat, this.lng];

  constructor() { }

  ngAfterViewInit(): void {
    // moviemiento del mapa
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola Mundo';

    new mapboxgl.Marker({
      element: markerHtml
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
  }

}
