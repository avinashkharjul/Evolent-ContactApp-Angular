import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/Services/contact.service';
import { Contact } from '../../Models/contact';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public contactService : ContactService) { }

  ngOnInit(): void {
    this.GetContacts();
  }

  contactList : any = [];  

  GetContacts() {
    return this.contactService.getContacts().subscribe((data: {}) => {
      this.contactList = data;
      //console.log(this.contactList);
    })
  }

  
}
