const data = {
    programs: [
        {id: 1, name: 'Woodbrige', sportid: 4 },
        {id: 2, name: 'Gainesville', sportid: 4 },
    ]
};

const getRandomInt = () => {
    const max = 1000;
    const min = 100;
    return Math.floor(Math.random() * Math.floor(max) + min);
  };
  
  const addProgram = (program) => {
    program.id = getRandomInt();
    data.programs.push(program);
    return program;
  };
  
  const updateProgram = (program) => {
    const index = data.programs.findIndex((v) => v.id === program.id);
    console.log(program);
    data.programs.splice(index, 1, program);
    return program;
  };
  
  const deleteProgram = (id) => {
    const value = parseInt(id, 10);
    data.programs = data.programs.filter((v) => v.id !== value);
    return true;
  };
  
  const getPrograms = () => {
    return data.programs;
  };
  
  module.exports = { addProgram, updateProgram, deleteProgram, getPrograms };