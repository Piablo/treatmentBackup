import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { PatientDetails } from '../../../assets/models/patient';
import { format } from 'util';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  
  constructor(private patientService:PatientService) { }
  
  ngOnInit() {
  }
  
  @Output() addMedicationInfo = new EventEmitter<PatientDetails>();
  
  //Application State
  patientSelected:boolean = false;
  firstNameSelected:boolean = false;
  
  //Patient Details
  firstName:string = null;
  lastName:string = null;
  title:string = null;
  medAidNumber:string = null;
  authNumber:string = null;
  idNumber:string = null;
  
  //Models
  patient: PatientDetails;
  filteredPatients: any[];
  
  //URLs
  url = '../assets/data/clients.json';
  
  acceptPatient(){
    this.addMedicationInfo.emit(this.patient);
  }
  currentlyFocused:string = "";
  currentEnteredText:string = "";
  
  onSelect(){
    this.acceptPatient();
  }

  formatUserEnteredString(){
    var lower = this.firstName.toLowerCase();
    this.firstName = lower.charAt(0).toUpperCase() + lower.substr(1);

    var lower = this.lastName.toLowerCase();
    this.lastName = lower.charAt(0).toUpperCase() + lower.substr(1);

    var lower = this.title.toLowerCase();
    this.title = lower.charAt(0).toUpperCase() + lower.substr(1);
  }
  enterNewPatientDetails(){
    
    this.formatUserEnteredString();

    var value = {
      firstName: this.firstName,
      lastName: this.lastName,
      title: this.title,
      authNumber: this.authNumber,
      medAidNum: this.medAidNumber,
      id: this.idNumber,
      name: this.title + " " + this.firstName + " " + this.lastName
    }
    this.patient = value;
    this.acceptPatient();
  }
  
  clearInputs(){
    this.patient.name = "";
    this.idNumber = "";
    this.medAidNumber = "";
    this.authNumber = "";
  }
  checkValidation(){
    if(this.firstName !== null
      && this.lastName !== null
      && this.title !== null
      && this.medAidNumber !== null
      && this.authNumber !== null
      && this.idNumber !== null){
        this.patientSelected = true;
      }
    }
    
    filterPatients(event) {
      let query = event.query;
      this.currentEnteredText = query;
      this.patientService.getPatients(this.url).then(patients => {
        this.filteredPatients = this.filterPatient(query, patients);
      });
    }
    
    filterPatient(query, patients: any[]):any[] {
      let filtered : any[] = [];
      for(let i = 0; i < patients.length; i++) {
        let patient = patients[i];
        if(patient.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(patient);
        }
        return filtered;
      }
    }
  }
  