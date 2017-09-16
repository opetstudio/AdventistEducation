import _ from 'lodash';

export const merge = (data_a, data_b) => {
  //const data_a = [{username:'root1', pass:'p'}];
  //const data_b = [{username:'root', pass:'ps'}, {username:'root1', pass:'pshhh'}];
  const new_data_a = _.map(data_a,(obj)=>{
      const row_data_b =  _.find(data_b,{username:obj.username});
      if(row_data_b){
          data_b.splice(data_b.indexOf(row_data_b), 1);
          return _.assign(obj, row_data_b);
      }
      return obj;
  });
  data_b.forEach(function(v){
      new_data_a.push(v);
  });
  return new_data_a;
};
