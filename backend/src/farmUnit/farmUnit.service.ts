import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

import { Repository } from 'typeorm';

import { Building } from '../building/building.entity';

import { FarmUnit } from './farmUnit.entity'

import axios from 'axios'

@Injectable()
export class FarmUnitService {
   constructor(
    @InjectRepository(FarmUnit)
    private farmUnitRepository: Repository<FarmUnit>
    
  ) {
     
   }

  async post(buildingID: number): Promise<string> {
    this.farmUnitRepository.save(new FarmUnit(buildingID));
    return 'OK'
  }

  async get(buildingID: number): Promise<any[]> {
    let farmUnits =await this.farmUnitRepository.find({
      buildingID:buildingID
    });
    let response = []
    farmUnits.map(elem => {
      let isAllive: boolean = elem.health > 0 ? true : false ;
      response.push({elem,isAllive})
    })
    return response;
  }

  async feed(id: number): Promise<string>{
    this.feedEnable(id)
    let farmUnit : FarmUnit = await this.farmUnitRepository.findOne(id);
    if(farmUnit.isEnable && farmUnit.health>0){
      farmUnit.health += 1;
      farmUnit.isEnable = false;
      
      this.feedEnable(id)
      await this.farmUnitRepository.save(farmUnit);
      return 'OK'
    } 
    else{
      return 'Not Enabled'
    }
  }

  async removeAll(): Promise<string>{
    let farmUnits = await this.farmUnitRepository.find();
    for(let i=0;i<farmUnits.length;i++){
      this.farmUnitRepository.delete(farmUnits[i].id);
    }
    return 'OK'
  }
  
  @Timeout(5000)
   async feedEnable(id){
    let farmUnit : FarmUnit = await this.farmUnitRepository.findOne(id);
    farmUnit.isEnable = true;
    await this.farmUnitRepository.save(farmUnit);
  }


  @Interval(10000)
  async feedCountdown(){
    let farmUnits : FarmUnit[] = await this.farmUnitRepository.find();
    farmUnits = farmUnits.map(elem => {
      if(elem.health>0){
        elem.health -=1;
        this.farmUnitRepository.save(elem);
      }
      
      return elem;
    })
  }

  @Interval('building-feed',60 * 1000)
  async buildingFeed(buildingID: number){
    let farmUnits : FarmUnit[] = await this.farmUnitRepository.find({
      buildingID:buildingID
    });
    for(let i=0;i<farmUnits.length;i++){
      farmUnits[i].health += (100 - farmUnits[i].health)/2;
      if(farmUnits[i].health>=100)
        farmUnits[i].health = 99;
      this.farmUnitRepository.save(farmUnits[i]);
    }
  }
}
