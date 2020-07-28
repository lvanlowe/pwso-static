const data = {
    sports: [
        { id: 1 , name: 'Bowling', canRegister: false, hasUniform: false, isTeamSport: false},
        { id: 2 , name: 'Soccer', canRegister: true, hasUniform: true, isTeamSport: true},
        { id: 3 , name: 'Bocce', canRegister: true, hasUniform: false, isTeamSport: false},
        { id: 4 , name: 'Basketball', canRegister: false, hasUniform: true, isTeamSport: true},
        { id: 5 , name: 'Floor Hockey', canRegister: false, hasUniform: true, isTeamSport: true},
    ]
};

const getRandomInt = () => {
    const max = 1000;
    const min = 100;
    return Math.floor(Math.random() * Math.floor(max) + min);
  };
  
  const addSport = (sport) => {
    sport.id = getRandomInt();
    data.sports.push(sport);
    return sport;
  };
  
  const updateSport = (sport) => {
    const index = data.sports.findIndex((v) => v.id === sport.id);
    console.log(sport);
    data.sports.splice(index, 1, sport);
    return sport;
  };
  
  const deleteSport = (id) => {
    const value = parseInt(id, 10);
    data.sports = data.sports.filter((v) => v.id !== value);
    return true;
  };
  
  const getSports = () => {
    return data.sports;
  };
  
  module.exports = { addSport, updateSport, deleteSport, getSports };