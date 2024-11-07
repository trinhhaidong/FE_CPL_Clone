import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private scripts: any = {};

  constructor() {}

  loadScript(url: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[url]) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = () => {
          this.scripts[url] = true;
          resolve({ script: url, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => reject({ script: url, loaded: false, status: 'Failed' });
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: url, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  loadScripts(...urls: string[]) {
    const promises: any[] = [];
    urls.forEach((url) => promises.push(this.loadScript(url)));
    return Promise.all(promises);
  }
}
