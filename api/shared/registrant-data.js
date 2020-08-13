const data = {
    registrants: []
};

const getRandomInt = () => {
    const max = 1000;
    const min = 100;
    return Math.floor(Math.random() * Math.floor(max) + min);
  };
  
  const addRegistrant = (registrant) => {
    registrant.id = getRandomInt();
    data.registrants.push(registrant);
    return registrant;
  };
  
  const updateRegistrant = (registrant) => {
    const index = data.registrants.findIndex((v) => v.id === registrant.id);
    console.log(registrant);
    data.registrants.splice(index, 1, registrant);
    return registrant;
  };
  
  const deleteRegistrant = (id) => {
    const value = parseInt(id, 10);
    data.registrants = data.registrants.filter((v) => v.id !== value);
    return true;
  };
  
  const getRegistrants = () => {
    return data.registrants;
  };
  
  module.exports = { addRegistrant, updateRegistrant, deleteRegistrant, getRegistrants };