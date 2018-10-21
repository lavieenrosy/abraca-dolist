module.exports = function getCategory(result) {

    const arrayOfCategories = [];

    // pushes categories into arrayOfCategories via Wolfram's "assumptions" object/array

    if (Array.isArray(result.queryresult.assumptions)) {
      for (let i = 0; i < result.queryresult.assumptions.length; i++) {
        const valuesObject = result.queryresult.assumptions[i].values;
        valuesObject.forEach((item) => {
          const category = item.name;
          arrayOfCategories.push(category);
        });
      }
    } else if (result.queryresult.assumptions instanceof Object) {
      const valuesObject = result.queryresult.assumptions.values;
      valuesObject.forEach((item) => {
        const category = item.name;
        arrayOfCategories.push(category);
      });
    }

    // pushes categories into arrayOfCategories via Wolfram's "pods" object

    if (result.queryresult.pods) {
      const podsObject = result.queryresult.pods;
      podsObject.forEach((item) => {
        const category = item.id;
        arrayOfCategories.push(category);
      });
    }
    console.log(arrayOfCategories);

    const bookClass                = arrayOfCategories.includes('BookClass');
    const movie                    = arrayOfCategories.includes('Movie');
    const movieClass               = arrayOfCategories.includes('MovieClass');
    const consumerProductsPTEClass = arrayOfCategories.includes('ConsumerProductsPTEClass');
    const televisionProgram        = arrayOfCategories.includes('TelevisionProgram');
    let containsTelevision = "";
    let containsFood = "";

    arrayOfCategories.forEach((item) => {
        let food = 'Food';
        let television = 'Television';
        if (item.includes(food)) {
            containsFood = true;
        }
        if (item.includes(television)) {
            containsTelevision = true;
        }
    });

    const food = containsFood;
    const television = containsTelevision;

    let category = "";

    if (bookClass) {
        category = "read";
    } else if (movieClass || movie || televisionProgram || television) {
        category = "watch";
    } else if (consumerProductsPTEClass) {
        category = "buy";
    } else if (food) {
        category = "eat";
    } else {
        category = "buy";
    }
    console.log("Category: ", category);
    return category;
};


