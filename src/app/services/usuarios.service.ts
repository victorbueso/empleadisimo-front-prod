import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_router_router_j } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = "https://empleadisimo.herokuapp.com/usuarios"
  public imOnline = false; 
  chatInformation = {};

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }
  
  obtainMessages():Observable<any>{
    return this.httpClient.get(`${ this.url }/obtainChat/${ this.cookieService.get('idUser') }`);
  }

  loginUsuario(data:any):Observable<any>{
    return this.httpClient.post(`${this.url}/signin`,data);
  }

  registrarUsuario(data:any):Observable<any>{
    return this.httpClient.post(`${this.url}`,data);
  }

  obtenerTodosUsuarios():Observable<any>{
    return this.httpClient.get(`${this.url}`,{});
  }

  getUser(idUser:string) : Observable<any> {
    return this.httpClient.get(`${this.url}/${idUser}`)
  }

  updateInfo(userInfo:any, idUser:string):Observable<any>{
    return this.httpClient.put(`${this.url}/updateEmployee/${idUser}`, userInfo)
  }

  updateInfoCompany(data:any,idUser:string):Observable<any>{
    return this.httpClient.post(`${this.url}/updateCompany/${idUser}`,data);
  }

  //Se envia el path de la iamgen
  uploadProfileImage(idUser:string,body:any):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/usuarios/profilePic/${idUser}`,body);
  }

  updateProfileImage(idUser:string,data:any):Observable<any>{
    return this.httpClient.put(`${this.url}/updatePic/${idUser}`,data);
  }

  obtenerUsuario(idUsuario:any){
    return this.httpClient.get(`${this.url}/${idUsuario}`)
  }

  addNotification(data:any):Observable<any>{
    return this.httpClient.put(`${this.url}/notifications/newPost`, data);
  }

  addNotificationCompany(data:any, idCompany:string):Observable<any>{
    return this.httpClient.put(`${this.url}/notifications/newPost/company/${idCompany}`, data)
  }

  getNotifications(idUser:String):Observable<any>{
    return this.httpClient.get(`${this.url}/notifications/${idUser}`);
  }

  readNotifications(idUser:String):Observable<any>{
    return this.httpClient.post(`${this.url}/notifications/read/${idUser}`, {})
  }

  loggedIn(){
    return !!this.cookieService.get('token');
  }


  uploadCV( vals: any ): Observable<any>{
    let data = vals;

    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/jdfiallos/auto/upload',
      data
    )
  }

  uploadCVBD( idUsuario: String, body: String ): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/usuarios/${idUsuario}/cv`, body);
  }


  updateCVBD( idUsuario:String, idUrl: String, body: any ): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/usuarios/${idUrl}/updateCV/${idUsuario}`, body);
  }


  sendPhoto(cv: File, idUser: string){
    
    const fd = new FormData();
    fd.append('curriculums', cv);
    fd.append('titulo', "Este es el titulo")
    return this.httpClient.post(`${this.url}/CV/${idUser}`, fd);

  }

  obtainMyCurriculums(idUser: string){
    return this.httpClient.get(`http://localhost:3000/usuarios/CVinfo/${idUser}`);
  }





  deleteCurriculum(body: any, idUser: string){
    return this.httpClient.post(`http://localhost:3000/usuarios/deleteCV/${ idUser }`, body);
  }




  isCompanyLogged(){
    if(this.cookieService.get('tipo')=='1'){
      return true
    }

    return false
  }
  
  isEmployeeLogged(){
    if(this.cookieService.get('tipo')=='0'){
      return true
    }
    return false
  }

  isAdminLogged(){
    if(this.cookieService.get('tipo')=='2'){
      return true
    }
    return false;
  }

  sendEmailVerification(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/verifyemail`, data);
  }

  updateCurriculums(cv: File, file: string, idUser: string){

    const fd1 = new FormData();
    fd1.append('curriculums', cv)
    fd1.append('fp1',file)
    return this.httpClient.put(`${this.url}/updateCV/${ idUser }`, fd1);
  }

  
  getCompany(idEmpresa: string):Observable<any>{
    return this.httpClient.get(`${this.url}/company/${ idEmpresa }`);
  }

  getAdmins() :Observable<any> {
    return this.httpClient.get(`${this.url}/admin/all`);
  }

  getCompanies() :Observable<any> {
    return this.httpClient.get(`${this.url}/admin/companies/all`);
  }

  getEmployees() :Observable<any> {
    return this.httpClient.get(`${this.url}/admin/employees/all`);
  }

  newAdmin(data:any):Observable<any>{
    return this.httpClient.post(`${this.url}/admin/newAdmin`, data);
  }

  updateStatusAdmin(data:any, idUser:string):Observable<any>{
    return this.httpClient.put(`${this.url}/admin/updateStatus/${idUser}`, data);
  }

  updateInfoAdmin(data:any, idUser:string):Observable<any>{
    return this.httpClient.post(`${this.url}/admin/updateInfo/${idUser}`, data);
  }
  followCompany(data:any,idUser:string):Observable<any>{
    return this.httpClient.post(`${this.url}/followCompany/${idUser}`,data);
  }
  StopfollowCompany(data:any,idUser:string):Observable<any>{
    return this.httpClient.post(`${this.url}/StopfollowCompany/${idUser}`,data);
  }

  verifyAccount(idUser:string):Observable<any>{
    return this.httpClient.post(`${this.url}/verifyAccount/${idUser}`, {})
  }
}
