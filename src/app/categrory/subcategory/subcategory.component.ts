import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { HomeService } from 'src/app/home.service';
import { SubcategoryService } from 'src/app/subcategory.service';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {
  data: any[] = [];
  products: any[] = [];

  selectedSection = '';
  selectedCategory = '';
  constructor(private subcategoryService: SubcategoryService , 
  
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private homeservice:HomeService,
    private router: Router,
  ) {
 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedSection = params['section'];
      this.selectedCategory = params['category'];
    });

    console.log('sas'+ this.selectedSection);
    this.homeservice.getCategories(this.selectedSection).subscribe(
    (response :  any) => {
      console.log('sas'+ response);
      this.products = response['MyData'].filter((category: any) => category.Category === this.selectedCategory);;
      
    },
    (error) => {
      console.error('Error fetching categories', error);
    }
  );


    // this.categoryService.getFilteredbyCategory(this.selectedSection, this.selectedCategory).subscribe(
    //   (response: any) => {
    //     this.products = response['MyData'];
    //   },
    //   (error) => {
    //     console.error('Error fetching filtered products', error);
    //   }
    // );



    // this.subcategoryService.allSubcategory().subscribe(
    //   (result: any) => {
    //     console.log(result);
    //     if (result ) {
    //       this.data = result;
    //     }
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
  }
  selectProduct(selectedProduct: string){
    this.router.navigate(['/viewpage'], { queryParams: { product: selectedProduct ,section: this.selectedSection  } });
  }
}
