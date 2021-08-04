import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from '../../services/usuarios.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})


export class CvComponent{
  photoSelected!: string | ArrayBuffer;
  titleCurriculum: string = "Seleccione su curriculum";
  titleCurriculumU: string = "Actualize/Cambie su curriculum"
  successFile = false;
  idEmpleado: string = "";
  curriculums: any = [];
  uploading = false;
  cvUpload = false;
  showCv = false;
  file!: File;

  constructor(private userService: UsuariosService,
              private cookiesService: CookieService) {
              this.idEmpleado = this.cookiesService.get("idUser")             
              this.updateCurriculum()
            }

  onPhotoSelected(event:any): void{
    if(event?.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0]
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file);
      this.successFile = false;
      this.titleCurriculum = "Curriculum seleccionado" 
    }
  }


  body: any = {};
  uploadPhoto(){
    const file_data = this.file;
    //Mandarlo a traves de peticiones Rest.
    console.log(file_data);
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'empleadisimo_cv');
    data.append('cloud_name', 'jdfiallos');


    this.userService.uploadCV( data ).subscribe( response=>{
      if ( response ){
        this.body = { urlCV: response.secure_url};
        console.log(this.body);
        this.userService.uploadCVBD(this.idEmpleado , this.body ).subscribe( res => {
          if (res){
            console.log(res);
            console.log('Se subio con exito el cv');
            this.addCv();
          }
        },
         error => { console.log(error)});
      }
    }, 
    error => {
      console.log(error);
    }
    )
  }

  updateCurriculum(){
    this.userService.obtainMyCurriculums(this.idEmpleado).subscribe((res) => {
      this.curriculums = res;
      //this.updateDirCv();
    }, err => console.error(err))
  }

  
  addCv(){
    this.showCv = false;
    this.cvUpload = !this.cvUpload;   
  }

  listCv(){
    this.cvUpload = false;
    this.showCv = !this.showCv;
    this.updateCurriculum();
  }

  updateDirCv(){
    for(var i = 0; i < this.curriculums.length; i++){
      this.curriculums[i] = `https://empleadisimo.herokuapp.com/${ this.curriculums[i] }`
    }
  }

  
  deleteCv(_idURL:string){
    this.body = { idUrl: _idURL }
    this.userService.deleteCurriculum(this.body, this.idEmpleado).subscribe(res => {
      //this.updateCurriculum();
      console.log(res);
      console.log('Se elimino correctamete.');
      this.listCv();
    }, err => {
      console.error(err)
    })
  }

  updateCV(url:string){
    const file_data = this.file;
    //Mandarlo a traves de peticiones Rest.
    console.log(file_data);
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'empleadisimo_cv');
    data.append('cloud_name', 'jdfiallos');


    this.userService.uploadCV( data ).subscribe( response=>{
      if ( response ){
        this.body = { urlCv: response.secure_url};
        console.log(this.body);

        //Aqui llamo a servicio para actualizar
        this.userService.updateCVBD(this.idEmpleado, url , this.body ).subscribe( res => {
          if (res){
            console.log(res);
            console.log('Se subio con exito el cv');
            this.listCv();
          }
        },
         error => { console.log(error)});
      }
    }, 
    error => {
      console.log(error);
    }
    )
  }

}
