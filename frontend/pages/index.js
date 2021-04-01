import Head from 'next/head'

import {useState, useEffect } from 'react'

import { createBuilding, getBuildings, addFarmUnit, listFarmUnit, feedFarmUnit } from '../api/services'



export default function Home() {
  const [name,setName] = useState('');
  const [unitName,setUnitName] = useState('');
  const [buildings,setBuildings] = useState(['aaa','bbb']);
  const [buildingName,setBuildingName] = useState('')
  const [farmUnitID,setFarmUnitID] = useState('');

  useEffect(() => {
    getBuildings()
    .then((response) => {
      console.log(response)
      setBuildings(response.data)
    })
    .catch((err)=>console.log(err))
  },[])

  const handleChange = (value, propName) => {
    if(propName === 'name')
      setName(value)
    if(propName === 'unitName')
      setUnitName(value)
    if(propName === 'buildingName')
      setBuildingName(value)
    if(propName === 'farmUnitID')
      setFarmUnitID(value)
    ///console.log(value, propName)
  }

  const  submitCreateBuilding = (e) => {
    e.preventDefault()
    createBuilding(name,unitName);
  }

  const submitAddFarmUnit = (e) => {
    e.preventDefault();
    let building = buildings.find(elem => elem.name === buildingName);
    console.log(building)
    addFarmUnit(building.id);
    getBuildings()
    .then((response) => {
      console.log(response)
      setBuildings(response.data)
    })
    .catch((err)=>console.log(err))

  }

  const submitListFarmUnits = (e) => {
    e.preventDefault();
    let building = buildings.find(elem => elem.name === buildingName);
    console.log(building)
    listFarmUnit(building.id)
    .then((result) => console.log(result));
  }

  const submitFeedFarmUnit = (e) => {
    e.preventDefault();
    let building = buildings.find(elem => elem.name === buildingName);
    let id = farmUnitID; 
    feedFarmUnit(id);
  }

  return (
    <div className="container">
      <form onSubmit={e => submitCreateBuilding(e)}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" autoComplete="name" onChange = {(e) => handleChange(e.target.value,'name') } required />
        <label htmlFor="unitName">Unit Name</label>
        <input id="unitName" type="text" autoComplete="unitName"  onChange = {(e) => handleChange(e.target.value,'unitName')} required />
        <button type="submit">Create Building</button>
      </form>
    <div id="buildings">
      {buildings?.map((elem,index) => 
        <div className='building' style={{display:'flex'}} key={index}>
          <p>{elem.name} </p>
          <p>{elem.unitName} </p>
          <p>{elem.numOfUnits} </p>

        </div>
      )}
    </div>
    <form onSubmit = {e => submitListFarmUnits(e)}>
      <label htmlFor="buildingName">Building name</label>
      <input id="buildingName" type="text" autoComplete="buildingName"  onChange = {(e) => handleChange(e.target.value,'buildingName')} />
      <button type="submit">List farm units</button>
    </form>
    <form onSubmit = {e => submitAddFarmUnit(e)}>
      <label htmlFor="buildingName">Building name</label>
      <input id="buildingName" type="text" autoComplete="buildingName"  onChange = {(e) => handleChange(e.target.value,'buildingName')} />
      <button type="submit">Add farm unit</button>
    </form>
    <form onSubmit = {e => submitFeedFarmUnit(e)}>
      <label htmlFor="buildingName">Building name</label>
      <input id="buildingName" type="text" autoComplete="buildingName"  onChange = {(e) => handleChange(e.target.value,'buildingName')} />
      <label htmlFor="farmUnitID">Farm unit ID</label>
      <input id="farmUnitID" type="number"  onChange = {(e) => handleChange(e.target.value,'farmUnitID')} />
      <button type="submit">Feed specific farm unit</button>
    </form>
    </div>
  )
}
