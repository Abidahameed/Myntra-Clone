import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { BrandService } from '../brand.service';
import { HomeService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  filteredData!: any[];
  isLoggedIn: boolean = false;
  data = [
    { Name: 'Men' },
    { Name: 'Women' },

  ];

  categories: any[] = [];
  products: any[] = [];
  cartItemCount: number = 0;
  selectedSection = '';
  section = '';
  selectedCategory = '';


  category: any[] = [];
  brands: any[]= [];
  // data: any[] = [];
  productList: any[] = [];
 sections:any[] =[];
  constructor( private categoryService: CategoryService,
    private brandservice:BrandService,
    private homeservice:HomeService , private router: Router ,
    private route: ActivatedRoute,
    public authservice: AuthService
   ) {
   

  }

  ngOnInit(): void {

    
    this.isLoggedIn = this.authservice.isLoggedIn();

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


        this.authservice.getCartItemCount().subscribe(count => {
          this.cartItemCount = count;
        });
        

      }
      
      
      ,
      (error) => {
        console.error('Error fetching data:', error);
      }
    );


    
    this.homeservice.allcategory().subscribe(
      (result: any) => {
        console.log(result);
        if (result ) {
          this.categories = result;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    

    
    this.homeservice.getSections().subscribe(
      (result: any) => {
        console.log(result);
        if (result ) {
          this.data = result;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.homeservice.productList().subscribe(
      (result: any) => {

        if (result && result.MyData) {
          this.productList = result.MyData;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    
    this.brandservice.allBrand().subscribe(
      (result: any) => {
        console.log(result);
        if (result ) {
          this.brands = result;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }

  selectProduct(selectedProduct: string,selectedSection: string){

    this.router.navigate(['/viewpage'], { queryParams: { product: selectedProduct ,section: selectedSection  } });
  }

  selectSection(section: string): void {

    this.selectedSection = section;
   
    this.router.navigate(['/category'], { queryParams: { section: section } });
  }


  selectCategory(categoryName: string, section: string): void {

    this.selectedCategory = categoryName;
    this.section = section;
   

       
    this.router.navigate(['/subcategory'], { queryParams: { section: this.section , category:this.selectedCategory  } });


  }
  

  logout(): void {
    this.authservice.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirect to home or login page
  }

  
  onSeeMoreClick(type: string) {
    // Handle See More button click event
  }


//   selectProduct(selectedProduct: string){
//     this.router.navigate(['/viewpage'], { queryParams: { product: selectedProduct ,section: this.selectedSection  } });

// }
}