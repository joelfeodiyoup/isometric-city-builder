import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { InterfaceComponent } from './interface/interface.component';
import { ToolbarComponent } from './organisms/toolbar/toolbar.component';
import { DropdownComponent } from './molecules/dropdown/dropdown.component';
import { SideMenuComponent } from './organisms/side-menu/side-menu.component';
import { SideMenuIconComponent } from './atom/side-menu-icon/side-menu-icon.component';

@NgModule({
  declarations: [AppComponent, MainScreenComponent, InterfaceComponent, ToolbarComponent, DropdownComponent, SideMenuComponent, SideMenuIconComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
