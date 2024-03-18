import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { ToastrService} from 'ngx-toastr';

import { ItemService } from '../../../services/item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

  subscription: any = Subscription;
  items: any = [];

  constructor(public itemService: ItemService,private router: Router, private toasterService:ToastrService)
  {

  }

  ngOnInit()
  {
    const ALL_PROCESSES = [
      this.getAllData(),
    ];

    Promise.all(ALL_PROCESSES)
    .then((results: any) => {
      this.items = results[0]?.data;
    });
  }
  ngDestroy () {
    this.subscription.unsubscribe()
  }
  getAllData()
  {
    return new Promise((resolve, reject) => {
      this.subscription =  this.itemService.getAll()
      .subscribe(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  addNew()
  {
    this.router.navigate(["/items/create"]);
  }

  edit(id:number)
  {
    this.router.navigate(["/items/edit/" + id]);
  }

  delete(id:number)
  {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.itemService.delete(id).subscribe((result:any) => {
          if(result?.status == true)
          {
            this.toasterService.success(result?.message, 'Success');
            this.ngOnInit();
          }
        })
      }
    })
  }
}
