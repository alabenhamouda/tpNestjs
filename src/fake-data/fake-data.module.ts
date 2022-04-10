import { TodoModule } from './../todo/todo.module';
import { Module } from '@nestjs/common';
import { FakeDataService } from './fake-data.service';
import { FakeDataController } from './fake-data.controller';

@Module({
  imports: [TodoModule],
  providers: [FakeDataService],
  controllers: [FakeDataController],
})
export class FakeDataModule {}
