import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
   return await this._storage?.set(key, value);
  }
  
  async get(key:string){
    try {
      return await this._storage?.get(key);
    } catch (error) {
      console.error('Error getting value:', error);
      throw error; // Re-throw the error for the caller to handle
    }
   
  }
}