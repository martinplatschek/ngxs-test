import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxsFormDirective} from '@ngxs/form-plugin';
import {select} from '@ngxs/store';
import {AppState} from './store/appState';
import {NgxMaskDirective} from 'ngx-mask';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    NgxsFormDirective,
    JsonPipe,
    NgxMaskDirective
  ],
  template: `
    <div>PartnerId: {{ partnerId() }}</div>
    <div>IsLoading: {{ isLoading() }}</div>
    <hr>
    <pre>
      {{ formModel() | json }}
    </pre>
    <hr>
    <form [formGroup]="appForm" ngxsForm="AppState.testForm">
      <div>
        <label>Name</label>
        <input formControlName="name">
      </div>
      <div>
        <label>Hidden Input (Numbers)</label>
        <input formControlName="email"  [hiddenInput]="true" mask="XXX/X0/0000">
      </div>
      <div>
        <label>Datum</label>
        <input formControlName="datum" mask="d0/M0/0000">
      </div>
    </form>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isLoading = select(AppState.isLoading);
  public partnerId = select(AppState.partnerId);
  public formModel = select(AppState.form)

  public appForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required]),
      datum: new FormControl('', [Validators.required]),
    });
  }
}
