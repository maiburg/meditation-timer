import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

import { State } from '@core/models/core';

@Injectable()
export class StoreService {
  initialState: State = {
    timer: undefined
  };

  state$ = new BehaviorSubject<State>(this.initialState);

  private get state(): State {
    return this.state$.getValue();
  }

  select<T>(fn: (state: State) => T): Observable<T> {
    return this.state$.asObservable().pipe(
      map((state: State) => fn(state)),
      distinctUntilChanged()
    );
  }

  set(newState: Partial<State>) {
    this.state$.next({
      ...this.state,
      ...newState
    });
  }
}
