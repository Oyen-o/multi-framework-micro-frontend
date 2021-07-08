import { AEMResponsiveGridComponent, AEMContainerComponent ,MapTo } from '@adobe/aem-angular-editable-components';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { TextComponent } from './app/components/text/text.component';
import { environment } from './environments/environment';

if (!(window as any).shell && environment.production) {
  enableProdMode();
}

// platformBrowser().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

declare const require: any;
const ngVersion = require('../package.json').dependencies['@angular/core'];
(window as any).plattform = (window as any).plattform || {};
let platform = (window as any).plattform[ngVersion];
if (!platform) {
  platform = platformBrowser();
  (window as any).plattform[ngVersion] = platform; 
}
platform.bootstrapModule(AppModule)
  .catch(err => console.error(err));


  // const TextEditConfig = {
  //   emptyLabel: 'Text',
  //   isEmpty: cqModel =>
  //     !cqModel || !cqModel.text || cqModel.text.trim().length < 1
  // };
    
  //   MapTo('wcm/foundation/components/responsivegrid')(AEMResponsiveGridComponent);
  
  //   MapTo('Mode/components/spa')(AEMContainerComponent);
  
  //   MapTo('Mode/components/text')(
  //     TextComponent,
  //     TextEditConfig
  //   );