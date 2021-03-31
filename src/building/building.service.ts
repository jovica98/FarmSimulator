import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';

import { FarmUnit } from '../farmUnit/farmUnit.entity'

import { FarmUnitService } from '../farmUnit/farmUnit.service'

import { SchedulerRegistry } from '@nestjs/schedule';

import axios from 'axios'

const API_URL = 'http://localhost:3000'


@Injectable()
export class BuildingService {
   constructor(
     private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Building)
    private buildingsRepository: Repository<Building>,
    
  ) {}

  async findAll(): Promise<any[]> {
    let buildings = await this.buildingsRepository.find();
    let response = []
    for(let i=0;i<buildings.length;i++){
      let id = buildings[i].id;
      let farmUnits = await axios.get(API_URL + `/farm-unit/${id}`);
      let numOfUnits = farmUnits.data.length;
      let {name,unitName} = buildings[i]
      response.push({name,unitName,id,numOfUnits})
    }
    return response;
  }

  findOne(id: number): Promise<Building> {
    return this.buildingsRepository.findOne(id);
  }

  async post(name: string, unitName: string): Promise<string>{
    await this.buildingsRepository.save(new Building(name,unitName));
    const interval = this.schedulerRegistry.getInterval('building-feed');
    clearInterval(interval);
    let building = await this.buildingsRepository.findOne({
      "name":name
    });
   
    let buildingID = building.id;
    await axios.post(API_URL + '/farm-unit', { buildingID });
    return 'OK'
  }

   async removeAll(): Promise<string>{
    let farmUnits = await this.buildingsRepository.find();
    for(let i=0;i<farmUnits.length;i++){
      this.buildingsRepository.delete(farmUnits[i].id);
    }
    return 'OK'
  }
}
