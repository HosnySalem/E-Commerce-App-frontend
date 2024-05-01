import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, search:string) {
    return products.filter((product: any) => product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
