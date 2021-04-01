let trimString={}
trimString.fullTrim = (str) => {
  let res;
  while(1){
    res=str.replace(" ","_")
    if(res==str){
        console.log(res)
        break
    }
    else {
      str=str.replace(" ","_")
    }
  }
  return str;
} 

trimString.unTrim = (str) => {
  let res;
  while(1){

    res=str.replace("_"," ")
    if(res==str){
        console.log(res)
        break
    }
    else {
      str=str.replace("_"," ")
    }
  }
  return str;
} 

trimString.trimArray = (array) => {
  return (array != undefined && array != null) ? array.map(x => trimString.fullTrim(x.toString())) : []
}

trimString.unTrimArray = (array) => {
  return (array != undefined && array != null) ? array.map(x => trimString.unTrim(x.toString())) : []
}

export default trimString