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
import { Observable, of } from 'rxjs';

@Controller('premier')
export class PremierController {
  @Get('/:name/:firstname')
  getPremierWithParam(@Param('name') params): string {
    console.log(params);
    console.log('GET 🐢');
    return 'GET 🐢';
  }

  @Get()
  getPremier(): Observable<number> {
    const observable = new Observable<number>((observer) => {
      let i = 5;
      setInterval(() => {
        if (!i) {
          observer.complete();
        }
        observer.next(i--);
      }, 1000);
    });
    observable.subscribe((val) => {
      console.log(val);
    });
    observable.subscribe(
      (val) => {
        console.log('cc j ai recu la valeur ' + val);
      },
      (erreur) => {
        console.log(erreur);
      },
      () => {
        console.log('end of process');
      },
    );
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
