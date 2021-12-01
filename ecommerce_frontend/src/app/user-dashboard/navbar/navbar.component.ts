import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {}

  // events: string[] = [];
  // opened: boolean = false;

  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
  //   window.location.host
  // );

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onLogout() {
    console.log('Navbar');
    // this.global_obj.removeToken();
    // this.global_obj.isLoggedin = false;
    // this.router.navigateByUrl('/login');
    // this.global_obj.setLoggedin(false);
  }
}
