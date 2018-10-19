function someData() {
  return new Promise((resolve, reject) => {

      setTimeout(() => {
        const data = ["fluffy", "scruffles"];
        resolve(data);
      }, 1000);

  });
}



// someData()
//   .then((data) => {
//     return someData();
//   })
//   .then((data) => {
//     return someData();
//   })
//   .catch((error) => {
//     console.log(error);
//   });



