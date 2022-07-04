import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }
      .row {
        background-color: white;
        z-index: 999;
        position: fixed;
        bottom: 10px;
        padding: 10px;
        left: 50px;
        border-radius: 5px;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  lat: number = -73.11445148646999;
  lng: number = -36.77574996278295;
  center: [number, number] = [this.lat, this.lng];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    // Al generar un listener se debe siempre destruir
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // Creando un listener para el mapa
    this.mapa.on('zoom', (ev) => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    // moviemiento del mapa
    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const { lat, lng } = target.getCenter();
      this.center = [lng, lat];
    });


  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));
  }


}
