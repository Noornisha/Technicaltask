import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import employee from 'src/app/shared/Models/employee/employeedata';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  addform: FormGroup;
  users = employee;
  employees: any;
  search: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastrService
  ) {
    this.addform = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      role: [null, [Validators.required]],
    });
    console.log(this.addform.valid);
  }

  ngOnInit(): void {
    this.users =  this.users.concat(JSON.parse(localStorage.getItem('Items') || '{}')); // get employee list
   
    let result = this.users.filter((obj) => {
      return obj.firstName;
    });
    console.log(result);
    this.employees = JSON.stringify(this.users);
  }
  delete(i: any) {
    this.users.splice(i, 1);
    localStorage.setItem('Items', JSON.stringify(this.users));
  }
  getUser(role:number){
    let users = this.users.filter(user => user.role === role);
    return users;
  }
 
  //search Employee
  onSearchKeyUp() {
    this.users = JSON.parse(this.employees);
    if (this.search !== undefined && this.search !== '') {
      this.users = this.users.filter(
        (it) =>
          it.firstName
            .toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase()) ||
          it.lastName
            .toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase())
      );
    }
  }

  addEmployee() {
    this.users = JSON.parse(localStorage.getItem('Items') || '{}'); // get employee list
    this.users.push({
      role: this.addform.controls.role.value,
      firstName: this.addform.controls.firstName.value,
      lastName: this.addform.controls.lastName.value,
      
    });
    localStorage.setItem('Items', JSON.stringify(this.users));
    this.toastr.success(' your information added successfully');
    this.addform.reset();
    
  }

  patchRole(e:any){
    this.addform.patchValue({
      role: parseInt(e.target.value),
    });
    console.log(this.addform.controls.role.value);
  }
}
