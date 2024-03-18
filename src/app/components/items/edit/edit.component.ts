import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../services/item.service';

import { ToastrService,} from 'ngx-toastr';

import { ReactiveFormsModule, FormGroup,FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  subscription: any = Subscription;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    is_enabled: new FormControl(false)
  });
  submitted: boolean = false;
  item = {
    id:0,
    name: '',
    description:'',
    is_enabled:false
  }

  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private itemService:ItemService,private toastrService:ToastrService) {}

  ngOnInit()
  {
    const id = this.route.snapshot.params['id'];

    const ALL_PROCESSES = [
      this.getData(id),
    ];

    Promise.all(ALL_PROCESSES)
    .then((results: any) => {
      this.item = results[0]?.data;
    });

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description:['', Validators.required],
        is_enabled: [false]
      }
    );
  }
  ngDestroy () {
    this.subscription.unsubscribe()
  }

  getData(id: number)
  {
    return new Promise((resolve, reject) => {
      this.subscription =  this.itemService.find(id)
      .subscribe(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit()
  {
    this.submitted = true;
   
    this.itemService.update(this.item.id, this.form.value).subscribe((result:any) => {
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
