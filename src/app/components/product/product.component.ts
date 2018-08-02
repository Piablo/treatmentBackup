import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientDetails } from '../../../assets/models/patient';
import { Http} from '@angular/http';
import { PatientService } from '../../services/patient.service';
import { Product } from '../../../assets/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  constructor(private http: Http, private patientService: PatientService) { }

  ngOnInit() {
    this.patients.push(this.patientModel);
  }

  @Input() patientModel: PatientDetails;
  @Output() addItem = new EventEmitter<Product>();

  patients:any[] = [];
  url = '../assets/data/products.json';
  filteredProducts: Product[];

  //Product Details
  product: Product;
  products: Product[] = [];
  nappi:string = "";
  productName = "";
  dosage:string = "";
  frequency:string = "";
  fullName:string = "";
  disableAddButton:boolean = true;

  //form state
  productSelected:boolean = false;

  onSelect(){
    this.nappi = this.filteredProducts[0].nappi;
    this.productName = this.filteredProducts[0].productName;

    //Update state
    this.productSelected = true;
    this.checkComponentState();
  }

  checkComponentState(){
    if(this.productSelected){
      this.disableAddButton = true;
      if(this.dosage.length > 0 && this.frequency.length > 0){
        if(this.productSelected){
          this.disableAddButton = false;
        }
      }else{
        this.disableAddButton = true;
      }
    }else{
      this.disableAddButton = true;
    }
  }

  clearInputs(){
    this.nappi = "";
    this.productName = "";
    this.dosage = "";
    this.frequency = "";
    this.toggleState();
  }

  toggleState(){
    var value = {
      nappi: "",
      productName: "",
      fullName: "",
      dosage: "",
      frequency: ""
    }
    this.product = value;
    this.productSelected = false;
    this.checkComponentState();
  }

  filterProducts(event) {
    //this.clearInputs();
    let query = event.query;
    this.patientService.getPatients(this.url).then(products => {
      this.filteredProducts = this.filterProduct(query, products);
    });
  }

  filterProduct(query, products: any[]):any[] {
    let filtered : any[] = [];
    for(let i = 0; i < products.length; i++) {
      let product = products[i];
      if(product.nappi.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(product);
      }
    }
    return filtered;
  }

  acceptPatient(){
    this.nappi = this.products[0].nappi;
    this.productName = this.products[0].productName;
    this.fullName = this.products[0].fullName;
  }
  saveProduct(){
    var value = {
      nappi: this.nappi,
      productName: this.productName,
      fullName: this.fullName,
      dosage: this.dosage,
      frequency: this.frequency,
    }
    this.products.push(value);
    this.clearInputs();
    this.addItem.emit(value);
  }
}
