import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { AnalyticsService } from '../shared/services/analytics.service';
import { OverviewPage } from '../shared/interfaces';
import { MaterialModal, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: MaterialModal

  overview$: Observable<OverviewPage>
  yesterdayDate = new Date().setDate(new Date().getDate() - 1)

  constructor(
    private analyticsS: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.overview$ = this.analyticsS.getOverview()
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy()
  }

  onTapT() {
    this.tapTarget.open()
  }
}
