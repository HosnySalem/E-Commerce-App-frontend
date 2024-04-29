import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  errors:string = '';
  selectedFile!: File;
 // productForm!: FormGroup;
 progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();


  productForm = new FormGroup({
    //id: new FormControl( [null]),
    name: new FormControl( ['', Validators.required, Validators.minLength(3),]),
    description: new FormControl( ['', Validators.required]),
    price: new FormControl( ['', Validators.required]),
    quantityAvailable: new FormControl( ['', Validators.required]),
    CatId: new FormControl( ['', Validators.required]),
    img: new FormControl( [''], Validators.required),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    public productServices: ProductService,
    public router: Router,
    private fb: FormBuilder,
    private http:HttpClient
  ) {}

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round( event.loaded );
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  ngOnInit(): void {
    
    //using form data
    // this.productForm = this.fb.group({
    //   name: ['', Validators.required,],
    //   description:['', Validators.required],
    //   price:['', Validators.required],
    //   quantityAvailable:['', Validators.required],
    //   CatId:['', Validators.required],
    //   img:[''],
    // });
    this.productServices.getAllCategories().subscribe({
      next:(value)=>{
        console.log(value);  
        this.categories = value;
      },
      error:(error)=>{
        console.log(error);
      }
    })
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
       // this.getProductId.setValue(null);
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
         // console.log(data);
          
          this.product = data;
          var cat = this.product.catId.toString();
          //this.getProductId.setValue(this.product.id);
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

  // get getProductId() {
  //   return this.productForm.controls['id'];
  // }
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
  productHandler(e: any) {
    e.preventDefault();
    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        // add

        //using form data
        // const formData = new FormData();
        // formData.append('name', this.productForm.value.name);
        // formData.append('description', this.productForm.value.description);
        // formData.append('quantityAvailable', this.productForm.value.quantityAvailable);
        // formData.append('price', this.productForm.value.price);
        // formData.append('CatId', this.productForm.value.getCatId);
        // formData.append('img', this.selectedFile);
        // this.productServices.saveProduct(formData).subscribe({
        //   next:(value)=>{
        //         console.log(value);
        //         console.log(this.productForm.value);
        //   },
        //   error:(error)=>{
        //     console.log(error);
            
        //     console.log(this.productForm.value);
        //   }
          
        // })

        this.productServices.addProduct(this.productForm.value).subscribe({
          next: (value) => {
           // console.log(value);
            console.log(this.productForm.value);
            
            this.router.navigate(['/products']);
          },
          error: (error) => console.log(error),
        });
       
      } else {
        // edit
       // console.log(this.product);
        
        this.product ={};
        var p = Object.assign({'id': this.productId}, this.productForm.value);
        this.productServices
          .updateProduct(this.productId,p)
          .subscribe({
            next: (value) => {
              console.log(this.productForm.value);
              
              console.log(value);
              
              this.router.navigate(['/products']);
            },
            error:(error)=>{
              console.log(this.productForm.value);
              
              console.log(error);
            }
          });
      }
    } else {
      console.log(this.productForm);
      
    }
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      var file= event.target.files[0];
      this.getimg.setValue(file);
      // this.selectedFile= event.target.files[0];
      // this.getimg.setValue(this.selectedFile);
    }
  }

  
  backToProducts() {
    this.router.navigate(['/products']);
  }

}
