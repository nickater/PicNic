import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHelperService {
  constructor() {}

  getFirstName(displayName: string) {
    console.log('displayName.split:', displayName.split(' ')[0]);
    return displayName.split(' ')[0];
  }

  getLastName(displayName: string) {
    console.log('displayName.split:', displayName.split(' ')[1]);
    return displayName.split(' ')[1];
  }
}
