import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/Models/contact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  contactDetails : Contact = { id : 0, firstName : '', lastName : '', phoneNumber : '',emailId : '',status : true};
  msg : string = "";

  constructor(private activatedRoute : ActivatedRoute
    ,private contactService : ContactService 
    ,private router : Router) { }

  ngOnInit(): void {
     this.contactDetails.id = this.activatedRoute.snapshot.params.id;
     this.contactService.getContact(this.contactDetails.id).subscribe((data: Contact) => {
      this.contactDetails = data;
      console.log(this.contactDetails);
    })
  }

  DeleteContact(id : number){
    return this.contactService.deleteContact(id).subscribe((data: {}) => {
      //this.GetContacts();
      this.msg = "Contact Deleted Successfully.";
        setTimeout(() => {
          this.router.navigate(['/List']);
        }, 1000);
    })
  }

}
