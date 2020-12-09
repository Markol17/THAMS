import { Component, OnInit } from "@angular/core";
import { Division } from "../objects/division.model";
import { Patient } from "../objects/patient.model";
import { AdmissionserviceService } from "../services/admissionservice.service";
import { CustomMessageService } from "../services/message.service";

@Component({
  selector: "app-admitpatient",
  templateUrl: "./admitpatient.component.html",
  styleUrls: ["./admitpatient.component.css"],
})
export class AdmitpatientComponent implements OnInit {
  divisionId: number;
  patientList: Patient[];
  division: Division;

  constructor(
    private admission: AdmissionserviceService,
    private customMessageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.patientList = [];
  }

  getRequestList() {
    this.admission.requestList(this.divisionId).valueChanges.subscribe({
      next: (data) => {
        console.log(data);
<<<<<<< HEAD
        var temp= data.data['requestList'];
        var temp2 = temp['patients'];
=======
        var temp = data.data["requestList"];
        var temp2 = temp["patient"];
>>>>>>> 3a39c430079ae3b994dbbfcbe00bd01a7bcf0dec
        console.log(temp2);
        this.patientList.splice(0, this.patientList.length);
        temp2.forEach((element) => {
          let jsonObj: any = JSON.parse(JSON.stringify(element));
          let currentPatient = <Patient>jsonObj;
          this.patientList.push(currentPatient);
        });
        if (this.patientList && this.patientList.length == 0) {
          this.customMessageService.setError(
            "No patient in the division admit list"
          );
        }
        console.log("patientList: " + this.patientList);
      },
      error: (err) => {
        console.error("Error getting request list: " + err);
        this.customMessageService.setError(
          "Could not get the request list beacause of " + err
        );
      },
    });
  }

<<<<<<< HEAD
  admit(id :number){

    this.admission.divisionInfo(this.divisionId).valueChanges.subscribe({ next: data => {
      this.division = null;
      console.log(data);
      const x = data.data['divisionInfo'];
      console.log(x);
      let jsonObj: any = JSON.parse(JSON.stringify(x));
      this.division = <Division>jsonObj;
      console.log(this.division);
      if(!this.division.isComplete){
        this.admission.admitPatient(id,this.divisionId,this.division);
        this.getRequestList();
      }else if(this.division.isComplete){
        console.log("No more space in the division")
        this.customMessageService.setError("No more space in the division");
      }
    },
    error: err => {
      console.error('Error admiting patient: ' + err);
      this.customMessageService.setError(err);
    } } );
    
=======
  admit(id: number) {
    this.admission.divisionInfo(this.divisionId).valueChanges.subscribe({
      next: (data) => {
        this.division = null;
        console.log(data);
        const x = data.data["divisionInfo"];
        console.log(x);
        let jsonObj: any = JSON.parse(JSON.stringify(x));
        this.division = <Division>jsonObj;
        console.log(this.division);
        if (!this.division.isComplete) {
          this.admission.admitPatient(id, this.divisionId, this.division);
        } else if (this.division.isComplete) {
          console.log("No more space in the division");
          this.customMessageService.setError("No more space in the division");
        }
      },
      error: (err) => {
        console.error("Error admiting patient: " + err);
        this.customMessageService.setError(err);
      },
    });
>>>>>>> 3a39c430079ae3b994dbbfcbe00bd01a7bcf0dec
  }
}
