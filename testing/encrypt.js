var cek = {"modifiedon":1505781858001,"createdon":1505781858001,"name":"admin","user_role":200,"username":"admin","id":"342323","photo_path":"","password":"YWRtaW4=","_id":"9di7FyAEBkHVYlR5"}

var opt = new Buffer(JSON.stringify(cek)).toString('base64');
console.log(opt);
opt = new Buffer(opt, 'base64').toString('ascii');
console.log(opt);
