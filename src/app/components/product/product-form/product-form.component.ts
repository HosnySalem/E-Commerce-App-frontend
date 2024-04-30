import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productId: any;
  product: any;
  categories: any;
  errors: string = '';
  selectedFile!: File;
  uploadResponse!: string;
  base64: any;

  productForm = new FormGroup({
    name: new FormControl(['', Validators.required, Validators.minLength(3)]),
    description: new FormControl(['', Validators.required]),
    price: new FormControl(['', Validators.required]),
    quantityAvailable: new FormControl(['', Validators.required]),
    CatId: new FormControl(['', Validators.required]),
    img: new FormControl([null, Validators.required]),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    public productServices: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.productServices.getAllCategories().subscribe({
      next: (value) => (this.categories = value),
      error: (error) => console.log(error),
    });
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getProductName.setValue(null);
        this.getPrice.setValue(null);
        this.getQuantity.setValue(null);
        this.getProductDescription.setValue(null);
        this.getCatId.setValue(null);
        this.getimg.setValue(null);
      },
    });
    if (this.productId != 0) {
      this.productServices.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          var cat = this.product.catId.toString();
          this.getProductName.setValue(this.product.name);
          this.getProductDescription.setValue(this.product.description);
          this.getPrice.setValue(this.product.price);
          this.getQuantity.setValue(this.product.quantityAvailable);
          this.getCatId.setValue(cat);
          console.log(this.productForm.value);
        },
      });
    }
  }

  get getProductName() {
    return this.productForm.controls['name'];
  }
  get getProductDescription() {
    return this.productForm.controls['description'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantityAvailable'];
  }
  get getCatId() {
    return this.productForm.controls['CatId'];
  }
  get getimg() {
    return this.productForm.controls['img'];
  }
  async productHandler(e: any) {
    e.preventDefault();
    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        // add
        const productData = {
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          quantityAvailable: this.productForm.value.quantityAvailable,
          CatId: this.productForm.value.CatId,
          img: this.base64,
        };
        this.productServices.addProduct(productData).subscribe({
          next: (value) => {
            console.log(value);
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        // edit
        // console.log(this.product);
        const productData = {
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          quantityAvailable: this.productForm.value.quantityAvailable,
          CatId: this.productForm.value.CatId,
          img: this.base64 ?? this.product.img,
        };
        this.product = {};
        var p = Object.assign({ id: this.productId }, productData);
        this.productServices.updateProduct(this.productId, p).subscribe({
          next: (value) => {
            console.log(value);
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.log(this.productForm.value);

            console.log(error);
          },
        });
      }
    } else {
      console.log(this.productForm);
    }
  }
  uploadImage(event: any) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target + 'reem');
      if (event.target) {
        this.base64 = event.target.result as string;
        console.log('omnia' + this.base64);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };

    reader.readAsDataURL(this.selectedFile);
  }

  backToProducts() {
    this.router.navigate(['/products']);
  }
}
