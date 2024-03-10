import { Component } from '@angular/core';
import {Subject} from "../../entity/Subject";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../Services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent {
  subject: Subject = new Subject();
  newSubjectFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,private subjectService:SubjectService,private route: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.newSubjectFormGroup = this.formBuilder.group({
      subjectTitle: ['', Validators.required],
      date: ['', Validators.required],
      content: ['', Validators.required],
      image: [''] // You can add validators as needed
      // Add other form controls corresponding to Subject properties
    });
  }

  handleSaveSubject(): void {
    if (this.newSubjectFormGroup.valid) {
      const subject: Subject = this.newSubjectFormGroup.value as Subject;

      // Call your service to save the subject
      this.subjectService.addSubject(subject).subscribe({
        next: data => {
          // Display success message
          alert("Subject has been successfully saved!");
          // Navigate to "/all-Subject"
          this.route.navigateByUrl("/forum");
        },
        error: err => {
          // Log error to console
          console.error(err);
          // Handle error as needed
          // You may want to display an error message to the user
        }
      });
    } else {
      // If form is not valid, log an error or handle it as needed
      console.error('Form is not valid');
      // You may want to display an error message to the user
    }
  }

}
