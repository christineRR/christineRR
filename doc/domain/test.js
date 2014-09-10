var fs = require('fs');
try {
  process.nextTick(function () {
    fs.open('non-existent file', 'r', function (err, fd) {
      if (err) throw err;
      console.log(fd);
    });
  });
} catch (err) {
  console.log('try catch:', err);
}
process.on('uncaughtException', function (err) {
  console.log('uncaughtException:', err);
});



// var domain = require('domain');
// var EventEmitter = require('events').EventEmitter;

// var d = domain.create();
// d.on('error', function (er) {
//   console.log('domain catch error:', er);
// });
// d.run(function() {
//   evt = new EventEmitter();
//   process.nextTick(function() {
//     fs.open('non-existent file', 'r', function (er, fd) {
//       if (er) 
//         // domainEmitter
//         // evt.emit('error', er);
//         // domainThrown
//         throw er;
//     });
//   });
// });
// fs.open('bind', 'r', d.bind(function (err, fd) {
//   if (err) throw err;
// }));
// fs.open('intercept', 'r', d.intercept(function (fd) {} ));
// process.on('uncaughtException', function (err) {
//   console.log('uncaughtException:', err);
// });




