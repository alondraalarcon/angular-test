import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ItemService } from '../../../services/item.service';

import { ToastrService,} from 'ngx-toastr';

import { ReactiveFormsModule, FormGroup,FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    is_enabled: new FormControl(false)
  });
  submitted: boolean = false;

  constructor(private router: Router,private formBuilder: FormBuilder,private itemService:ItemService,private toastrService:ToastrService) {}

  ngOnInit()
  {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description:['', Validators.required],
        is_enabled: [false]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }



  submit()
  {
    this.submitted = true;
   
    this.itemService.create(this.form.value).subscribe((result:any) => {
      if(result?.status == true)
      {
        this.toastrService.success(result?.message, 'Success');
        this.back();
      }
    })
  }

  back()
  {
    this.router.navigate(['/items/list']);
  }
}
