import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productForm: FormGroup;

constructor(private fb: FormBuilder,
   private router: Router) {
  this.productForm = this.fb.group({
    producto: ["", Validators.required],
    categoria: ["", Validators.required],
    ubicacion: ["", Validators.required],
    precio: ["", Validators.required],

  })
}

agregarProducto(){
  //console.log(this.productForm);
  //console.log(this.productForm.get('producto')?.value);
  const PRODUCTO: Producto ={
    nombre: this.productForm.get('producto')?.value,
    categoria: this.productForm.get('categoria')?.value,
    ubicacion: this.productForm.get('ubicacion')?.value,
    precio: this.productForm.get('precio')?.value,
  }
  console.log(PRODUCTO);
  this.router.navigate(['/']);
}
}
