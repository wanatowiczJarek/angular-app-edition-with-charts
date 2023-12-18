
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityDetails, EntityType, EntityUpdateDto } from 'libs/entities/data-repository/src/lib/model/model';
import { EntityService } from 'libs/entities/data-repository/src/lib/services/entity.service';


@Component({
  selector: 'angular-monorepo-list',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
})
export class EntityDetailsComponent implements OnInit {

  entityForm = this.fb.group({
    trackingId: ['', Validators.required],
    name: ['', Validators.required],
    entityType: ['', Validators.required],
  });
  entityDetails: EntityDetails = {} as EntityDetails;
  availableEntityTypes: EntityType[] | undefined;
  editMode = false;
  cities: any;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const entityId = params.get('id');

      if (!entityId) return;

      this.entityService.getEntityDetails(entityId).subscribe((details: EntityDetails) => {
        this.entityDetails = details;
        this.entityForm.patchValue({
          trackingId: details.trackingId,
          name: details.name,
          entityType: details.entityType
        });
      });

      this.entityService.getEntityTypes().subscribe(types => {
        this.availableEntityTypes = types;
      })
    });
  }

  handleSave(): void {
    if (this.entityForm.valid) {
      const entityUpdateDto = this.entityForm.value as EntityUpdateDto;
      const entityId = this.entityDetails.entityId;

      this.entityService.updateEntity(entityUpdateDto, entityId).subscribe(
        updatedEntity => {
          this.entityDetails = updatedEntity;
          this.editMode = false;
          this.router.navigate(['/entity/list', updatedEntity.entityId]);
        },
        () => this.router.navigate(['/entity/list'])
      );
    } else {
      this.entityForm.markAsDirty();
    }
  }

}
