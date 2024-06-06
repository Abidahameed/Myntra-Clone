import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-categrory',
  templateUrl: './categrory.component.html',
  styleUrls: ['./categrory.component.css']
})
export class CategroryComponent {

  category: any[] = [];
  brands: any[]= [];
  data: any[] = [];
  productList: any[] = [];
 sections:any[] =[];

 categories: any[] = [];
  products: any[] = [];
  selectedSection = '';
  selectedCategory = '';

 filteredData: any[] = [];

  constructor(private categoryService: CategoryService , 
    private route: ActivatedRoute,
    private router: Router,
    private homeservice:HomeService  ) {

    
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedSection = params['section'];
    });
    this.categoryService.allcategory().subscribe(
      (result: any) => {
        console.log(result);
        if (result ) {
          this.categories = result;
          this.categories = result.filter((category: any) => category.section === this.selectedSection);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

   
    //   // this.getFilteredProducts(Section);
    //   console.log('sas'+ this.selectedSection);
    //   this.homeservice.getCategories(this.selectedSection).subscribe(
    //   (response :  any) => {
    //     console.log('sas'+ response);
    //     this.categories = response['MyData'];
    //   },
    //   (error) => {
    //     console.error('Error fetching categories', error);
    //   }
    // );
 
  }

  // getFilteredProducts(Section: string): void {


  //   this.categoryService.getFilteredProducts(Section).subscribe(
  //     (response) => {
  //       console.error(' filtered products');
  //       this.filteredData = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching filtered products', error);
  //     }
  //   );
  // }

  selectCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
   

       
    this.router.navigate(['/subcategory'], { queryParams: { section: this.selectedSection , category:this.selectedCategory  } });


  }

  onSeeMoreClick(type: string) {
    // Handle See More button click event
  }



}
