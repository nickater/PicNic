import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHelperService {
  constructor() {}

  getFirstName(displayName: string) {
    try {
      return displayName.split(' ')[0];
    } catch (error) {
      return '';
    }
  }

  getLastName(displayName: string) {
    try {
      return displayName.split(' ')[1];
    } catch (error) {
      return '';
    }
  }

  setToTitleCase = (name: string) => {
    try {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch (error) {
      return '';
    }
  };
}
