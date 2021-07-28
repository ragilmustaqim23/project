import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  title:any;
  catatantugas:any=[];
  userData:any={};
  
  constructor(
    public dialog:MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.title='Catat Tugasmu';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getCatatantugas();
    });
  }

  loading: boolean | undefined;
  getCatatantugas()
  {
    this.loading=true;
    this.db.collection('catatantugas', ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.catatantugas=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }

  productDetail(data: any, idx: any)
  {
    let dialog=this.dialog.open(ProductDetailComponent,{
      width:'400px',
      data: data
    });
    dialog.afterClosed().subscribe(res=>{
      return;
    })
  }

  loadingDelete:any={};
  deleteProduct(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('catatantugas').doc(id).delete().then(res=>{
        this.catatantugas.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
  }

}