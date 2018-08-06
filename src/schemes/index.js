import { schema } from 'normalizr';


const classes = new schema.Entity('classes', {}, {
  idAttribute: 'id'
});
const teacher = new schema.Entity('teachers',{},{
  idAttribute:'id'
})

const satisfiled = new schema.Entity('satisfiled',{
  class_info:classes,
  teacher_info:teacher
},{
  idAttribute:'time'
})

export const SATISFILEDLIST = [ satisfiled ];