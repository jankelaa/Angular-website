import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AgentComponent } from './agent/agent.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfilComponent } from './profil/profil.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { ListingComponent } from './listing/listing.component';
import { ZahteviProdajaComponent } from './zahtevi-prodaja/zahtevi-prodaja.component';
import { GrafikoniComponent } from './grafikoni/grafikoni.component';
import { IzmenaNekretnineComponent } from './izmena-nekretnine/izmena-nekretnine.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgentComponent,
    UserComponent,
    AdminComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfilComponent,
    NekretnineComponent,
    ListingComponent,
    ZahteviProdajaComponent,
    GrafikoniComponent,
    IzmenaNekretnineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
