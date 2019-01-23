// external components
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// internal components
import { routes as routeComponents } from '../environments/routes';

/**
 * Componentdecorator
 */
@NgModule({
  imports: [RouterModule.forRoot(routeComponents)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
