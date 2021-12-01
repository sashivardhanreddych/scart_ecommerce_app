import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  // Declaration of variables
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activateSpinner: boolean = true;

  constructor() {}
}
