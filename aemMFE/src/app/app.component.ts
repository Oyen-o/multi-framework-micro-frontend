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

import { Constants } from '@adobe/aem-angular-editable-components';
import { ModelManager } from '@adobe/aem-spa-page-model-manager';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: '#spa-root', // tslint:disable-line
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  items: any;
  itemsOrder: any;
  path: any;

  constructor(private httpClient:HttpClient, private router:Router) {
    ModelManager.initialize().then(this.updateData);
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('accept', 'application/json');
    // headers.append('observe', 'body');
    // headers.append('responceType','json');
    // headers.append('Access-Control-Allow-Origin','*')

    // this.httpClient.get('http://gmfx-dev-aem-author-publish-dispatcher.gmfinancial.com/content/Mode/us/en.model.json',
    // {headers})
    // .toPromise().catch(this.updateData)
  }

  ngOnInit(): void {
    this.router.navigateByUrl(location.pathname.substr(1));
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(location.pathname.substr(1));
    });
  }

  private updateData = pageModel => {
    console.log(pageModel);
    this.path = pageModel[Constants.PATH_PROP];
    this.items = pageModel[Constants.ITEMS_PROP];
    this.itemsOrder = pageModel[Constants.ITEMS_ORDER_PROP];
  }
}

