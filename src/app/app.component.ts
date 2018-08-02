import { Component} from '@angular/core';
import { Product } from '../assets/models/product';
import { PatientService } from '../app/services/patient.service';

interface TreatmentProtocol {
  protocolId:number;
  patientName:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private patientService: PatientService){
  }
  ngOnInit(){
  }

  getTestData(){
    this.patientService.getTestData();
  }

  uniqueID:number = 11111;
  products: Product[] = [];

  treatmentProtocols:TreatmentProtocol[] = [];

  addItem(event){
    this.products.push(event);
  }
  patientModel:any;
  patientSearch:boolean = true;

  addMedicationInfo(event){
    this.patientModel = event;
    this.patientSearch = false;
  }

  editProtocol(event){
  }
  
  submitProtocol(){
    this.patientSearch = true;

    var value = {
      protocolId:this.uniqueID,
      patientName: this.patientModel.name
    }
    this.treatmentProtocols.push(value);
    this.products = [];
    this.uniqueID++;
  }
}
