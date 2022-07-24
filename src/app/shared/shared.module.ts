import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MenuComponent } from '@shared/components/menu/menu.component';
import { LogoutDirective } from '@shared/directives/app-logout-attribute.directive';

@NgModule({
  imports: [],
  exports: [MenuComponent, LogoutDirective],
  declarations: [MenuComponent, LogoutDirective],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
