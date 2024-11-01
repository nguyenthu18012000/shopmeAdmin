import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name!: string; // Nhận tên icon
  svgContent: string | undefined;
  path: string = '';
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.loadIcon(this.name);
  }

  private loadIcon(name: string) {
    const iconPath = `assets/icons/${name}.svg`;
    console.log(iconPath);
    this.path = iconPath;

    this.httpClient.get(iconPath, { responseType: 'text' }).subscribe(
      (svg) => {
        console.log('aksjdfasdfkj', svg);
        const svgElement = this.renderer.createElement('div');
        svgElement.innerHTML = svg;
        this.renderer.appendChild(this.el.nativeElement, svgElement);
      },
      (err) => {
        console.error(`Không tìm thấy icon: ${name}`, err);
        // this.renderer.setProperty(
        //   this.el.nativeElement,
        //   'innerHTML',
        //   '<p>Không tìm thấy icon</p>'
        // );
      },
      () => {
        console.log('complete');
      }
    );
  }
}
