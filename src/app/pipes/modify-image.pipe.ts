import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyImage'
})
export class ModifyImagePipe implements PipeTransform {

  transform(value: String) {
    if(value != ''){
      return "https://empleadisimo.herokuapp.com/" + value;
    }else{
      return '/assets/img/usuario-sin-foto.png';
    }
  }

}