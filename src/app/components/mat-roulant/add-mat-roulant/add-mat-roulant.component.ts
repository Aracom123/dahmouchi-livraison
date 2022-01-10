import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatRoulantService } from 'src/app/services/mat-roulant.service';

@Component({
  selector: 'app-add-mat-roulant',
  templateUrl: './add-mat-roulant.component.html',
  styleUrls: ['./add-mat-roulant.component.css']
})
export class AddMatRoulantComponent implements OnInit {

  constructor(private mrService: MatRoulantService, private fb: FormBuilder, private router: Router) { }

  mrFormGroup = new FormGroup({
    matricule: new FormControl(''),
    libelle: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    etat: new FormControl('')
  });

  ngOnInit(): void {
    this.initMRForm();
  }

  initMRForm(){
    this.mrFormGroup = this.fb.group({
      matricule:["", Validators.required],
      libelle:[""],
      description:[""],
      type:["",Validators.required],
      etat:[""]
    });
  }

}
