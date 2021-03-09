import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/*class Unit  {
	health: number;
	isAlive: boolean;
	name: string;
  constructor(name){
    this.name = name;
    this.isAlive = true;
    this.health = Math.floor(Math.random() * (100 - 50) + 50); 
  }
}*/

@Entity()
export class Building {
  constructor(name,unitName){
    this.name = name;
    this.unitName = unitName;
    let health = Math.floor(Math.random() * (100 - 50) + 50);
    let healthString=health.toString()
    this.healths = []
    this.healths.push(healthString);
    console.log(this)
    //this.health = Math.floor(Math.random() * (100 - 50) + 50); 
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unitName: string;

  @Column("simple-array")
  healths: string[]

  //@Column({ default: true })
  //isActive: boolean;
}