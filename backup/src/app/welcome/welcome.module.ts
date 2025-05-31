import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HeroComponent } from './hero/hero.component';
import { HeroNavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [HeroComponent, HeroNavbarComponent, WelcomeComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
})
export class WelcomeModule {}
