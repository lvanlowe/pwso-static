import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { UserInfo } from './models/user-info';
import { CreateSuccess, SelectByKey, Clear, LoadAll } from '@briebug/ngrx-auto-entity';
import { Sport } from './models/sport';
import { Program } from './models/program';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Prince William Special Olympics Web App';
  public expanded = true;
  public selected = 'Deacons';
  public items: Array<any> = [];
  public canLogin = true;
  public canLogout = false;
  public isAdmin: boolean;
  public isProduction: boolean;
  public logButtonText = 'Login';
  public greeting: string;
  testText: any;
  userInfo: UserInfo;
  userInfos: UserInfo[];

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

    if (environment.production){
      this.isProduction = true;
    } else {
      this.isProduction = false;
    }
    this.items[0].selected = true;

    // ********* for testing
    //
    this.userInfo = {identityProvider: 'facebook', userDetails: 'Van', userId: 'b6c7c7ed83484c0c9b0c43d0c5302b20', userRoles: ["usher", "deacon", "anonymous", "authenticated"] };
    this.store.dispatch(new CreateSuccess(UserInfo, this.userInfo));
    this.store.dispatch(new SelectByKey(UserInfo, this.userInfo.userId ));
    //
    // **********

    // ********* for production
    //
    // this.userInfo = await this.getUserInfo();
    //
    // **********

    this.checkUser();

    // this.store.dispatch(new LoadAll(Sport));
    // this.store.dispatch(new LoadAll(Program));

    // // this.userInfos = [{identityProvider: 'facebook', userDetails: 'Van', userId: 'b6c7c7ed83484c0c9b0c43d0c5302b20', userRoles: ["usher", "deacon", "anonymous", "authenticated"] }];
    // this.store.dispatch(new LoadAll(Deacon));
    // this.store.dispatch(new LoadAllSuccess(UserInfo, this.userInfos ));
    // this.store.dispatch(new SelectByKey(UserInfo, this.userInfos[0].userId ));
    // this.store.pipe(select(currentUserInfo)).subscribe(data => (this.testText = data));
    // this.store.pipe(select(isAdminRole)).subscribe(data => (this.isAdmin = data));

  }

  // onButtonClick() {
  //   this.title = 'Hello from Kendo UI!';
  // }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      this.userInfo = clientPrincipal;
      this.store.dispatch(new CreateSuccess(UserInfo, this.userInfo));
      this.store.dispatch(new SelectByKey(UserInfo, this.userInfo.userId ));
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  onLogon() {
    if (this.canLogin) {
      this.canLogin = false;
      this.canLogout = false;
    } else {
      this.canLogin = true;
      this.canLogout = false;
      this.logButtonText = 'Login';
      this.greeting = '';
      this.store.dispatch(new Clear(UserInfo));
    }

  }

  checkUser() {
    if (this.userInfo) {
      this.canLogin = false;
      this.canLogout = true;
      this.logButtonText = 'Logout';
      this.greeting = 'Hi ' + this.userInfo.userDetails;
    } else {
      this.canLogin = true;
      this.canLogout = false;
      this.greeting = '';
    }
  }

  goAuth(provider: string) {
    // ********* for production
    //
    // const { pathname } = window.location;
    // const redirect = `post_login_redirect_uri=${pathname}`;
    // const url = `/.auth/login/${provider}?${redirect}`;
    // window.location.href = url;
    //
    // **********

    // ********* for testing
    //
    this.userInfo = {identityProvider: 'facebook', userDetails: 'Van', userId: 'b6c7c7ed83484c0c9b0c43d0c5302b20', userRoles: ["usher", "deacon", "anonymous", "authenticated"] };
    this.store.dispatch(new CreateSuccess(UserInfo, this.userInfo));
    this.store.dispatch(new SelectByKey(UserInfo, this.userInfo.userId ));

    // **********

    this.checkUser();
  }

}
