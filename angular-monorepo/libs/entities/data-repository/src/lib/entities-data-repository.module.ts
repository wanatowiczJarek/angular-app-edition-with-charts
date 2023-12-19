import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityService } from './services/entity.service';
import { MockEntityService } from './services/mock-entity.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    EntityService,
    MockEntityService
  ]
})
export class EntitiesDataRepositoryModule { }
