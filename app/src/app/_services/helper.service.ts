import CryptoJS from 'crypto-js';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  secretKey = environment.encryptionKey;

  constructor(private title: Title) {}

  encrypt(data) {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decrypt(data) {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  isEmpty(d) {
    if (typeof d == 'number' || typeof d == 'boolean') return false;
    if (typeof d == 'undefined' || d === null) return true;
    if (typeof d.length != 'undefined') return d.length == 0;
    let count = 0;
    for (let i in d) if (d.hasOwnProperty(i)) count++;
    return count == 0;
  }

  setLocalStorage(data, name) {
    if (this.isEmpty(data)) return 'Data cannot be empty';
    if (this.isEmpty(name)) return 'Name cannot be empty';
    localStorage.setItem(name, this.encrypt(JSON.stringify(data)));
  }

  getLocalStorage(name) {
    if (this.isEmpty(name)) return 'Name cannot be empty';
    let d = localStorage.getItem(name);
    if (this.isEmpty(d)) return null;
    return JSON.parse(this.decrypt(d));
  }

  updateTitle(name) {
    if (name) {
      this.title.setTitle(`${environment.appName} - ${name}`);
    }
  }
}
