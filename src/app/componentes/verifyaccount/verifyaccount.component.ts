import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {

  constructor(private helperService:HelperService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private usuariosService:UsuariosService,
    private cookiesService:CookieService) { }

  ngOnInit(): void {
    this.helperService.navbarNoVisible.emit();
    this.usuariosService.verifyAccount(this.activatedRoute.snapshot.params.id)
    .subscribe(() => {
    }, error => {
      console.log(error);
    })
  }

  home(){
    if(this.cookiesService.get('tipo')=='0'){
      this.router.navigate(['/employee']);
    } else if(this.cookiesService.get('tipo')=='1'){
      this.router.navigate(['/company']);
    } else{
      this.router.navigate(['/']);
    }
  }

}
