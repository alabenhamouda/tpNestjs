import { Controller, Post } from '@nestjs/common';
import { FakeDataService } from './fake-data.service';

@Controller('fake-data')
export class FakeDataController {
  constructor(private readonly fakeDataService: FakeDataService) {}
  @Post()
  fakeData() {
    return this.fakeDataService.fake();
  }
}
