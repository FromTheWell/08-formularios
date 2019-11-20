import { Component } from '@angular/core';
import { FormGroup, FormControl , Validators, FormArray} from "@angular/forms";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  usuario = {
    nombrecompleto: {
      nombre: 'Fernando',
      apellido: 'Herrera'
    },
    email: 'fer@ejemplo.com',
    pasatiempos: ['comer'],
    username: 'strider',
    password: '',
    password2: ''
  };

  forma: FormGroup;
  controls: any;

  constructor() {
    this.forma = new FormGroup(
      {
      nombrecompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(5), this.noHerrera])
      }),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      pasatiempos: new FormArray([new FormControl('', Validators.required )]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });

    // proporciona los datos por defecto del objeto usuario
    this.forma.setValue( this.usuario );

    this.forma.controls.password2.setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

    // valueChanges se llama cada vez  que algún valor se modifique en el formulario
    this.forma.controls.username.valueChanges.subscribe( data => {
      console.log(data);
    });
    this.forma.controls.username.statusChanges.subscribe( data => {
      console.log(data);
    });

   }



   agregarNuevoPasatiempo() {
     (this.forma.controls.pasatiempos as FormArray).push(
       new FormControl('', Validators.required)
     );
     console.log('Nuevo pasatiempo agragado');
   }

   noHerrera(control: FormControl): { [s: string]: boolean } {

    if ( control.value === 'Herrera' ) {
      return{
        noHerrera: true
      };
    }
    return null;


    }

    noIgual(control: FormControl): any {

      if ( control.value !== this.controls.password.value ) {
        return{
          noiguales: true
        };
      }
      return null;
    }


    existeUsuario( control: FormControl): Promise<any>|Observable<any> {

      let promesa = new Promise(
        (resolve, reject) => {
          setTimeout( () => {
            if ( control.value === 'strider') {
              resolve( {existe: true});
            } else {
              resolve( null );
            }
          }, 3000);
        }
      );
      return promesa;
    }

   guardarCambios( ) {
     console.log('forma-->Valor', this.forma.value);
     console.log('forma', this.forma);

     // Reseteo estado pristine
     this.forma.reset( {
       nombrecompleto:
       {
         nombre: '',
         apellido: ''
       },
       email: '',
       pasatiempos: [],
       username: '',
       password: '',
       password2: ''

      });
   }

}
