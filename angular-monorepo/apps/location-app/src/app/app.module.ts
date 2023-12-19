import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { EntitiesFeatureHomepageModule } from '@angular-monorepo/entities/feature-homepage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { EntitiesDataRepositoryModule } from '@angular-monorepo/entities/data-repository';
import { EntityService } from 'libs/entities/data-repository/src/lib/services/entity.service';
import { MockEntityService } from 'libs/entities/data-repository/src/lib/services/mock-entity.service';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

function EntitiesDataServiceFactory() {
  const useMock = true;

  return useMock ? new MockEntityService() : new EntityService();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    EntitiesDataRepositoryModule,
    BrowserModule,
    BrowserAnimationsModule,
    AvatarModule,
    PanelMenuModule,
    MenuModule,
    BadgeModule,
    AvatarGroupModule,
    TableModule,
    EntitiesFeatureHomepageModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    {
      provide: EntityService,
      useFactory: EntitiesDataServiceFactory
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
