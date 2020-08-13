const data = {
    programs: [
        {id: 1, name: 'Manassas', sportid: 1 },
        {id: 2, name: 'Woodbridge', sportid: 1 },
        {id: 3, name: 'Woodbridge', sportid: 2 },
        {id: 4, name: 'Woodbridge', sportid: 3 },
        {id: 5, name: 'Gainesville', sportid: 4 },
        {id: 6, name: 'Woodbridge', sportid: 4 },
        {id: 7, name: 'Manassas', sportid: 5 },
        {id: 8, name: 'Woodbridge', sportid: 6 },
        {id: 9, name: 'Colgan', sportid: 7 },
        {id: 10, name: 'Manassas', sportid: 7 },
        {id: 11, name: 'Woodbridge', sportid: 8 },
        {id: 12, name: 'Gainesville', sportid: 8 },
        {id: 13, name: 'Colgan', sportid: 9 },
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