import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Controller('premier')
export class PremierController {
  @Get('/:name/:firstname')
  getPremierWithParam(@Param('name') params): string {
    console.log(params);
    console.log('GET 🐢');
    return 'GET 🐢';
  }

  @Get()
  getPremier(): Observable<string> {
    const observable = new Observable<string>((observer) => {
      let i = 3;
   	  let msg = '';
      setInterval(() => {
        if (!i) {
          observer.complete();
        }
        i--;
        observer.next(msg += 'get ');
      }, 500);
    }).pipe(map((data) => data.toUpperCase()));
    return observable;
    // console.log('GET 🐢');
    // return 'GET 🐢';
  }

  @Post()
  postPremier(@Body() data) {
    console.log('POST 🐇');
    return data;
  }

  @Delete()
  deletePremier() {
    console.log('Delete 🚚');
    return 'Delete 🚚';
  }

  @Put()
  putPremier() {
    console.log('PUT 🚚');
    return 'PUT 🚚';
  }

  @Patch()
  patchPremier() {
    console.log('Patch 🚚');
    return 'Patch 🚚';
  }
}
