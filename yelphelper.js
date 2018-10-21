module.exports = function yelpFunction(response, inputName) {
  let category = "";
  console.log(response);

  if (response.businesses.length === 0) {
    category = "no restaurant";
  }

  const businesses = response.businesses;
  const nameArray = [];

  businesses.forEach((item) => {
    const name = item.name.toLowerCase();
    nameArray.push(name);
  });

  nameArray.forEach((item) => {
    if (item.includes(inputName.toLowerCase())) {
      console.log("Item: ", item, "Name: ", inputName.toLowerCase());
      category = "eat";
    };
  });

  return category;
};
