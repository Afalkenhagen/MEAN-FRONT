import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';



@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{
  productForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;
constructor(private fb: FormBuilder,
   private router: Router,
   private toastr: ToastrService,
   private _productoService: ProductoService,
   private aRouter: ActivatedRoute) {
  this.productForm = this.fb.group({
    producto: ["", Validators.required],
    categoria: ["", Validators.required],
    ubicacion: ["", Validators.required],
    precio: ["", Validators.required],

  })
  this.id = this.aRouter.snapshot.paramMap.get('id');
}

ngOnInit(): void {
  this.esEditar();
}

agregarProducto(){
  const PRODUCTO: Producto ={
    nombre: this.productForm.get('producto')?.value,
    categoria: this.productForm.get('categoria')?.value,
    ubicacion: this.productForm.get('ubicacion')?.value,
    precio: this.productForm.get('precio')?.value,
  }

  if (this.id !== null) {
    //editamos producto
    this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
      this.toastr.info('El producto fue actualizado con exito!', 'Producto Actualizado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productForm.reset();
    })
  } else {
    //agregamos producto
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productForm.reset();
    })
  }



}
esEditar() {
  if(this.id !== null) {
    this.titulo = 'Editar producto';
    this._productoService.obtenerProducto(this.id).subscribe(data => {
      this.productForm.setValue({
        producto: data.nombre,
        categoria: data.categoria,
        ubicacion: data.ubicacion,
        precio: data.precio,
      })
    })
  }
}
}
