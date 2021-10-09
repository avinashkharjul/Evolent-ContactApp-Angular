import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Models/contact';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ContactService } from 'src/app/Services/contact.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  ContactForm!: FormGroup ;
  isSubmitted : boolean = false;
  msg : string = "";
  IsButtonDisable : boolean = false;
  ButtonName : string = "Add Contact";

  constructor(private fb: FormBuilder, private contactService : ContactService,private router : Router
    ,private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.contactDetails.id = this.activatedRoute.snapshot.params.id;
    
    this.ContactForm = this.fb.group({  
      Id : [0],
      FirstName: ['',[Validators.required]],  
      LastName: ['',[Validators.required]],  
      EmailId: ['',[Validators.required,Validators.email]],  
      PhoneNumber: ['',[Validators.required]],  
      Status: [true]  
    });
    
    if(this.contactDetails.id != undefined && this.contactDetails.id != 0)
    {
      this.contactService.getContact(this.contactDetails.id).subscribe((data: Contact) => {
        //console.log(data);
        this.ButtonName = "Update Contact"
        this.ContactForm = this.fb.group({  
          Id : [data.id],
          FirstName: [data.firstName,[Validators.required]],  
          LastName: [data.lastName,[Validators.required]],  
          EmailId: [data.emailId,[Validators.required,Validators.email]],  
          PhoneNumber: [data.phoneNumber,[Validators.required]],  
          Status: [data.status]  
        });
      })
    }
  }

  contactDetails : Contact = { id : 0, firstName : '', lastName : '', phoneNumber : '',emailId : '',status : true};

  get form() {  
    return this.ContactForm.controls;  
  } 

  addContact(){
    this.isSubmitted = true;  
    if (this.ContactForm.invalid) {  
      return  
    }  

    console.log(this.form.FirstName.value);
    this.contactDetails.firstName = this.form.FirstName.value; 
    this.contactDetails.lastName = this.form.LastName.value; 
    this.contactDetails.emailId = this.form.EmailId.value; 
    this.contactDetails.phoneNumber = this.form.PhoneNumber.value; 
    this.contactDetails.status = this.form.Status.value; 

    this.IsButtonDisable = true;
    if(this.contactDetails.id == 0 || this.contactDetails.id == undefined)
    {
      this.contactService.createEmployee(this.contactDetails).subscribe((data: {}) => {
        //this.contactList = data;
        //console.log(data);
        this.msg = "Contact Added Successfully.";
        setTimeout(() => {
          this.router.navigate(['/List']);
        }, 1000);
      })
    }
    else{
      this.contactService.updateEmployee(this.contactDetails.id,this.contactDetails).subscribe((data: {}) => {
        //this.contactList = data;
        //console.log(data);
        this.msg = "Contact Updated Successfully.";
        setTimeout(() => {
          this.router.navigate(['/List']);
        }, 1000);
      })
    }
    
  }
}
