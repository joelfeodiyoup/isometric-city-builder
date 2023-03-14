import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainScreenService } from '../main-screen.service';

@Component({
  selector: 'main-screen',
  templateUrl: './main-screen.component.html',
})
export class MainScreenComponent {
  @ViewChild('mainScreenContainer', { static: false })
  mainScreenContainer: ElementRef = {} as ElementRef;
  context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  constructor(private mainScreenService: MainScreenService) {}
  ngAfterViewInit(): void {
    this.mainScreenService.initCanvas().then(() => {
      (this.mainScreenContainer.nativeElement as HTMLElement).appendChild(
        this.mainScreenService.canvas
      );
      this.mainScreenService.draw();
    });
    // (this.mainScreenContainer.nativeElement as HTMLElement).appendChild(
    //   // this.mainScreenService.canvas

    // );
    // this.mainScreenService.draw();
    // this.mainScreenService.drawGrid();
  }

  rotate() {
    this.mainScreenService.rotate();
  }
  public zoomIn() {
    this.mainScreenService.zoomIn();
  }

  public zoomOut() {
    this.mainScreenService.zoomOut();
  }
}
