import { Module } from '@nestjs/common';
import { AppController,CatControler } from './app.controller';
import { AppService,CatService } from './app.service';

import {Connection } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';

import { Building } from './building/building.entity';
import { BuildingService } from './building/building.service'
import { BuildingController } from './building/building.controller'
import { BuildingsModule } from './building/building.module'
//import {Unit} from './'

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'eu-cdbr-west-03.cleardb.net',
      port: 3306,
      username: 'b20982a532e42a',
      password: 'fb968800',
      database: 'heroku_0d9f2abae0c49cc',
      entities: [Building],
      synchronize: true,
    })
  ,BuildingsModule],
  controllers: [AppController,BuildingController],
  providers: [AppService,BuildingService],
})

export class AppModule {
	constructor(private connection: Connection) {}
}


/*({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'farm',
      entities: [Building],
      synchronize: true,
    }*/