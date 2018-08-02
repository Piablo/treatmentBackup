import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient  } from '@angular/common/http';

interface TreatmentProtocolPerson{
  PersonID: number,
  FirstName: string,
  IDNumber: string,
  MedicalAidName: string,
  Surname: string,
  UnisolveProfileNumber: string,
  TreatmentProtocols: any[]
}

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  
  constructor(private http: Http, private httpClient: HttpClient) {}

  treatmentProtocolPerson: TreatmentProtocolPerson;
  
  getPatients(url) {
    return this.http.get(url)
    .toPromise()
    .then(res => <any[]> res.json().data)
    .then(data => { return data; });
  }

  getTestData(){
    this.http.get('../assets/data/treamentProtocols.json').subscribe(res => {
      var responce = res.json()[0];
      this.treatmentProtocolPerson = responce;
      console.log(this.treatmentProtocolPerson);
    });
  }
  
  getData(){

    var url = "http://tpapi01.azurewebsites.net/api/treatmentprotocolpersons/Search?searchOptions.firstName=eric";

    //over here
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Authorization','A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc=');
    // headers.append('Access-Control-Allow-Origin','http://localhost:4200');

    // let options = new RequestOptions({ headers: headers });
    // console.log(options)
    // //return this.http.get(url + 'album.get?album_id=' + album_id + '&apikey=' + this.apikey, options)
    // //return this.http.get(url, options)
    // this.http.get(url, options).subscribe(res => {
    //   console.log(res);
    // })
  
    //------------

    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    headers.append('Authorization','A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc=');
     let options = new RequestOptions({ headers:headers});

  this.http.get(url, options).subscribe(res => {
    console.log(res.json());
  })
  }
}
