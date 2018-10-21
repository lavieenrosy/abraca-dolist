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

    const bookClass                = arrayOfCategories.includes('BookClass');
    const BookClass                = arrayOfCategories.includes('book')
    const movie                    = arrayOfCategories.includes('Movie');
    const movieClass               = arrayOfCategories.includes('MovieClass');
    const consumerProductsPTEClass = arrayOfCategories.includes('ConsumerProductsPTEClass');
    const televisionProgram        = arrayOfCategories.includes('TelevisionProgram');
    let containsTelevision = "";
    let containsFood = "";
    let containsBook = "";

    arrayOfCategories.forEach((item) => {
        let food = 'Food';
        let television = 'Television';
        let book = 'Book';
        if (item.includes(food)) {
          containsFood = true;
        }
        if (item.includes(television)) {
          containsTelevision = true;
        }
        if (item.includes(book)) {
          containsBook = true;
        }
    });

    const food = containsFood;
    const television = containsTelevision;

    let category = "";

    if (bookClass || containsBook) {
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
    return category;
};


