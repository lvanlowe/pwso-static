import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'pwso-app';
  items: Array<any> = [];

  constructor(private router: Router, private store: Store<AppState>) {}

  async  ngOnInit() {
    const routes: any[] = this.router.config;

    routes.forEach(route => {
      this.items.push({
          text: route.text,
          path: route.path ? route.path : '',
          icon: route.icon
      });
    });

    this.items[0].selected = true;

    // this.userInfo = {identityProvider: 'facebook', userDetails: 'Van', userId: 'b6c7c7ed83484c0c9b0c43d0c5302b20', userRoles: ["usher", "deacon", "anonymous", "authenticated"] };
    // this.store.dispatch(new CreateSuccess(UserInfo, this.userInfo));
    // this.store.dispatch(new SelectByKey(UserInfo, this.userInfo.userId ));

    // // this.userInfo = await this.getUserInfo();

    // this.checkUser();

    // // this.userInfos = [{identityProvider: 'facebook', userDetails: 'Van', userId: 'b6c7c7ed83484c0c9b0c43d0c5302b20', userRoles: ["usher", "deacon", "anonymous", "authenticated"] }];
    // this.store.dispatch(new LoadAll(Deacon));
    // this.store.dispatch(new LoadAllSuccess(UserInfo, this.userInfos ));
    // this.store.dispatch(new SelectByKey(UserInfo, this.userInfos[0].userId ));
    // this.store.pipe(select(currentUserInfo)).subscribe(data => (this.testText = data));
    // this.store.pipe(select(isAdminRole)).subscribe(data => (this.isAdmin = data));

  }
}
