import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

import { Repository } from 'typeorm';

import { Building } from '../building/building.entity';

import { FarmUnit } from '../farmUnit/farmUnit.entity'

import axios from 'axios'

@Injectable()
class FeedInterval{
  @Interval(5000)
  feedEnable(): void {
    let enable : boolean = true;
    //farmUnitService.setFeedEnabled(enable);
  }
 }
