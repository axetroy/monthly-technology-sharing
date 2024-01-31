// AAA
//   BBB
//     CCC
//       DDD

//       DDD
//     CCC
//   BBB
// AAA

function read() {
  os.read("/", function () {
    os.exist("/", function () {
      os.stat("/", function () {
        os.readdir("", function () {
          // 111
        });
      });
    });
  });
}
