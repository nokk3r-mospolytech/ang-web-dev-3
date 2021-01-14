import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findUsers'
})
export class FindUsersPipe implements PipeTransform {

  transform(items: any[], searchStr: string): any[] {
    console.log(searchStr);
    if (searchStr =='' )
      return items;
    else{
      let fItems = items.filter((item)=>
        ((item.name + ' ' + item.surname).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1)||((item.surname + ' ' + item.name).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1))
      return fItems;
    }
  }

}
