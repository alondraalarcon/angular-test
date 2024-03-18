import { Routes } from '@angular/router';

/** COMPONENTS */
import { ItemsComponent } from './components/items/list/items.component';
import { AddComponent } from './components/items/add/add.component';
import { EditComponent } from './components/items/edit/edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'items/list', pathMatch: 'full'},
    { path: 'items/list', component: ItemsComponent },
    { path: 'items/create', component:AddComponent},
    { path: 'items/edit/:id', component: EditComponent}
];
