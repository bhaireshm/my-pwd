import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HomeComponent } from './modules/shared/home/home.component';
import { HeaderComponent } from './modules/shared/header/header.component';
import { FooterComponent } from './modules/shared/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
