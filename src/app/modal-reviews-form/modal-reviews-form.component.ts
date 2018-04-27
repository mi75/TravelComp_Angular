import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-reviews-form',
  templateUrl: './modal-reviews-form.component.html',
  styleUrls: ['./modal-reviews-form.component.css']
})
export class ModalReviewsFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
