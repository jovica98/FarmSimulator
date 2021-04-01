import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {Connection } from 'typeorm'

import { Building } from './building.entity';

import { BuildingService } from './building.service'

import { BuildingController } from './building.controller'

import { FarmUnit } from '../farmUnit/farmUnit.entity'


@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingService],
  controllers: [BuildingController],
  exports: [TypeOrmModule]
})

export class BuildingsModule {
	constructor(private connection: Connection) {}
}