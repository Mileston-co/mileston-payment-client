import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MilestonPayButtonDirective } from "./mileston-pay-button.directive";

@NgModule({
  declarations: [MilestonPayButtonDirective],
  imports: [CommonModule],
  exports: [MilestonPayButtonDirective],
})
export class MilestonPayButtonModule {}
