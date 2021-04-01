import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const createBuilding = (name,unitName) => {
	console.log(name,unitName)
	return axios.post(API_URL + '/building', {name,unitName})
}

export const getBuildings = () => {
	return axios.get(API_URL + '/building');
}

export const getBuildingByID = (id) => {
	return axios.get(API_URL + `/building/${id}`);
} 

export const addFarmUnit = (buildingID) => {
	return axios.post(API_URL + '/farm-unit',{buildingID});
}

export const listFarmUnit = (buildingID) => {
	//console.log(id)
	return axios.get(API_URL + `/farm-unit/${buildingID}`);
}

export const feedFarmUnit = (id) => {
	return axios.post(API_URL + '/feed', {id});
}