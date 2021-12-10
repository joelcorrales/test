import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Launch, TestService } from '../test.service';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
})
export class LaunchesComponent implements OnInit {
  destroy$ = new Subject();
  launches: Launch[] = [];

  constructor(private testService: TestService) {
    this.testService
      .getLaunches()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.launches = data;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
