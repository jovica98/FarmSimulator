import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {Connection } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '@nestjs/schedule';

import { Building } from './building/building.entity';
import { BuildingService } from './building/building.service'
import { BuildingController } from './building/building.controller'
import { BuildingsModule } from './building/building.module'

import { FarmUnitModule } from './farmUnit/farmUnit.module'
import { FarmUnitController, FeedController } from './farmUnit/farmUnit.controller'
import { FarmUnitService } from './farmUnit/farmUnit.service'
import { FarmUnit} from './farmUnit/farmUnit.entity'

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'eu-cdbr-west-03.cleardb.net',
      port: 3306,
      username: 'b20982a532e42a',
      password: 'fb968800',
      database: 'heroku_0d9f2abae0c49cc',
      entities: [Building, FarmUnit],
      synchronize: true
    }),
    BuildingsModule,
    FarmUnitModule,
    ScheduleModule.forRoot()],
  controllers: [AppController,BuildingController,FarmUnitController,FeedController],
  providers: [AppService,BuildingService,FarmUnitService],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
