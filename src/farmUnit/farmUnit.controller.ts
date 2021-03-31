import { Controller, Get, Post, Param, Body, Delete, HttpCode, Header } from '@nestjs/common';
import { FarmUnitService} from './farmUnit.service';
import {Building} from '../building/building.entity'

import { FarmUnit} from './farmUnit.entity'

class PostBody{
	name: string;
	unitName: string
}

class FeedBody{
  id: number;
}

class FarmUnitBody{
  buildingID: number;
}

@Controller('farm-unit')
export class FarmUnitController {
  constructor(private readonly farmUnitService: FarmUnitService) {}

 
  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  @HttpCode(200)
    async create(@Body() farmUnitBody : FarmUnitBody) {
      console.log('Controller',farmUnitBody.buildingID)
        return await this.farmUnitService.post(farmUnitBody.buildingID);
    }

  @Get(':buildingID')
  async getFarmUnits(@Param('buildingID') buildingID: number): Promise<any[]>{
    console.log(buildingID,await this.farmUnitService.get(buildingID));
    return await this.farmUnitService.get(buildingID);
  }

  @Delete()
  async delete(): Promise<string>{
    return await this.farmUnitService.removeAll();
  }
}


@Controller('feed')
export class FeedController {
  constructor(private readonly farmUnitService: FarmUnitService) {}

  @Post()
    create(@Body() feedBody: FeedBody){
      return this.farmUnitService.feed(feedBody.id)
    }

}