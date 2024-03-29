import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterComponent } from './BackOffice/footer/footer.component';
import { DynamicContentComponent } from './BackOffice/dynamic-content/dynamic-content.component';
import { NavbarComponent } from './BackOffice/navbar/navbar.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { DynamicFrontComponent } from './FrontOffice/dynamic-front/dynamic-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import  {HttpClientModule} from "@angular/common/http";
import { FeedbackComponent } from './feedback/feedback.component';
import { AddCarpoolingComponent } from './BackOffice/add-carpooling/add-carpooling.component';
import { AllSubjectComponent } from './BackOffice/all-subject/all-subject.component';
import { CreateSubjectComponent } from './BackOffice/create-subject/create-subject.component';
import { ChatComponent } from './BackOffice/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterComponent,
    DynamicContentComponent,
    NavbarComponent,
    SidebarComponent,
    HomeBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    DynamicFrontComponent,
    HomeFrontComponent,
    FeedbackComponent,
    AddCarpoolingComponent,
    AllSubjectComponent,
    CreateSubjectComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
