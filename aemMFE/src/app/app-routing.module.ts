/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import {
  AemPageDataResolver,
  AemPageRouteReuseStrategy
} from '@adobe/aem-angular-editable-components';
import { NgModule } from '@angular/core';
import {
  RouteReuseStrategy,
  RouterModule,
  Routes,
  UrlMatcher,
  UrlMatchResult,
  UrlSegment
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageComponent } from './components/page/page.component';

export function AemPageMatcher(url: UrlSegment[]): UrlMatchResult {
  if (url.join('/').endsWith('.html')) {
    return {
      consumed: url,
      posParams: {
        path: url[url.length - 1]
      }
    };
  }
}

export function endsWith(prefix: string): UrlMatcher {
  return (url: UrlSegment[]) => {
      const fullUrl = url.map(u => u.path).join('/');
      if (fullUrl.endsWith(prefix)) {
          return ({ consumed: url});
      }
      return null;
  };
}

const routes: Routes = [
  { matcher: endsWith('content'), redirectTo: environment.appRoot },
  {
    matcher: AemPageMatcher,
    component: PageComponent,
    resolve: {
      path: AemPageDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AemPageDataResolver,
    {
      provide: RouteReuseStrategy,
      useClass: AemPageRouteReuseStrategy
    }
  ]
})
export class AppRoutingModule {}
