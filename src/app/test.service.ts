import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, Subject, take } from 'rxjs';

export interface Launch {
  details?: string;
  flight_number?: number;
  mission_name?: string;
  rocket?: Rocket;
  launch_date_unix?: number;
}

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  active: boolean;
  cost_per_launch: number;
  company: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getRockets(): Observable<Rocket[]> {
    return this.http.get<Rocket[]>('https://api.spacexdata.com/v3/rockets');
  }

  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>('https://api.spacexdata.com/v3/launches');
  }

  getRocketById(rocketId: string) {
    return this.getRockets().pipe(
      take(1),
      map((data) => {
        return data.filter((rocket) => rocket.rocket_id === rocketId)?.[0];
      })
    );
  }

  getLaunchesById(launchId: number) {
    return this.getLaunches().pipe(
      take(1),
      map((data) => {
        return data.filter((launch) => launch.flight_number === launchId)?.[0];
      })
    );
  }

  getFullLaunchDetails(rocketId: string, launchId: number) {
    const launch$ = this.getLaunchesById(launchId).pipe(take(1));
    const rocket$ = this.getRocketById(rocketId).pipe(take(1));

    return forkJoin([launch$, rocket$]).pipe(
      map(([launch, rocket]) => {
        launch.rocket = rocket;

        return launch;
      })
    );
  }

  isInFavorites(rocketId: string, launchId: number): boolean {
    return !!localStorage.getItem(`${rocketId}-${launchId}`);
  }

  addToFavorites(rocketId: string, launchId: number) {
    localStorage.setItem(`${rocketId}-${launchId}`, 'true');
  }

  removeFromFavorites(rocketId: string, launchId: number) {
    localStorage.removeItem(`${rocketId}-${launchId}`);
  }
}
