import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Launch, TestService } from '../test.service';

export interface RocketParams {
  launchId: number;
  rocketId: string;
}

@Component({
  selector: 'app-rockets',
  templateUrl: './rockets.component.html',
  styleUrls: ['./rockets.component.scss'],
})
export class RocketsComponent implements OnInit {
  params: RocketParams;
  destroy$ = new Subject();
  launch: Launch = {};
  isInFavorites: boolean = false;

  constructor(private route: ActivatedRoute, private testService: TestService) {
    this.params = <RocketParams>route.snapshot.params;

    testService
      .getFullLaunchDetails(this.params.rocketId, Number(this.params.launchId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.launch = result;
      });

    this.isInFavorites = testService.isInFavorites(
      this.params.rocketId,
      this.params.launchId
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addToFavorites() {
    this.isInFavorites = true;
    this.testService.addToFavorites(this.params.rocketId, this.params.launchId);
  }

  removeFromFavorites() {
    this.isInFavorites = false;
    this.testService.removeFromFavorites(
      this.params.rocketId,
      this.params.launchId
    );
  }
}
