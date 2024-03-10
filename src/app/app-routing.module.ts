import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from "./BackOffice/home-back/home-back.component";
import { SidebarComponent } from "./BackOffice/sidebar/sidebar.component";
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { HomeFrontComponent } from "./FrontOffice/home-front/home-front.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {AddCarpoolingComponent} from "./BackOffice/add-carpooling/add-carpooling.component";
import {AllSubjectComponent} from "./BackOffice/all-subject/all-subject.component";
import {CreateSubjectComponent} from "./BackOffice/create-subject/create-subject.component";
import { ChatComponent } from './BackOffice/chat/chat.component';

const routes: Routes = [
  
  {
    path: "",
    component: AllTemplateFrontComponent,
    children: [
      {
        path: "home",
        component: HomeFrontComponent
      }
    ]
  },


  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "home",
        component: HomeBackComponent
      } ,{
        path: "forum",
        component: AllSubjectComponent
      },{
        path: "create-subject",
        component: CreateSubjectComponent
      },
      {
        path: "chat/:roomId",
        component: ChatComponent
      },{path: 'chat/:userId',
       component: ChatComponent}
    ]
  },

  {path:"add",
    component:FeedbackComponent},
  {path:"addCarpooling",
    component:AddCarpoolingComponent},
  {
    path: "chat/:roomId",
      component: ChatComponent},
  {path: 'chat/:userId',
    component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
