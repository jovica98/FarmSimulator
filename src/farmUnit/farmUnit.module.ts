import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {Connection } from 'typeorm'

import { Building } from '../building/building.entity';

import { FarmUnitService } from './farmUnit.service'

import { FarmUnitController, FeedController } from './farmUnit.controller'

import { FarmUnit } from './farmUnit.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FarmUnit])],
  providers: [FarmUnitService],
  controllers: [FarmUnitController, FeedController],
  exports: [TypeOrmModule]
})

export class FarmUnitModule {
	constructor(private connection: Connection) {}
}