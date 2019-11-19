import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from "@angular/forms";
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  usuario = {
    nombrecompleto: {
      nombre: 'Lucas',
      apellido: 'Domínguez'
    },
    email: 'lucas@ejemplo.com'


  };

  forma: FormGroup;

  constructor() {
    this.forma = new FormGroup(
      {
      nombrecompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(5)])
      }),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
      });
   }
   guardarCambios() {
     console.log('forma-->Valor', this.forma.value);
     console.log('forma', this.forma);

   }

}
