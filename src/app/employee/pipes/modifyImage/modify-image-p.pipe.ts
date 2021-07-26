import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyImageP'
})
export class ModifyImagePPipe implements PipeTransform {

  transform(value: String) {
    if(value != ''){
      return "https://empleadisimo.herokuapp.com/" + value;
    }else{
      return '/assets/img/usuario-sin-foto.png';
    }
  }
}
