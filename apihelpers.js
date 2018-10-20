module.exports = function getCategory(arrayOfCategories) {

    // arrayOfValueObjects.forEach((item) => {
    //     var category = item.name;
    //     arrayOfCategories.push(category);
    // });

    var BookClass                = arrayOfCategories.includes('BookClass');
    var Movie                    = arrayOfCategories.includes('Movie');
    var MovieClass               = arrayOfCategories.includes('MovieClass');
    var ConsumerProductsPTEClass = arrayOfCategories.includes('ConsumerProductsPTEClass');
    // var RetailLocationClass = arrayOfCategories.includes('RetailLocationClass');
    var FoodTrueOrFalse = "";

    arrayOfCategories.forEach((item) => {
        let word = 'Food';
        if (item.includes(word)) {
            FoodTrueOrFalse = true;
        }
    });

    var Food = FoodTrueOrFalse;

    // console.log(BookClass, Movie, MovieClass, ConsumerProductsPTEClass, RetailLocationClass, Food)

    var category = "";
    if (BookClass) {
        category = "read";
    } else if (MovieClass || Movie) {
        category = "watch";
    } else if (ConsumerProductsPTEClass) {
        category = "buy";
    } else if (Food) {
        category = "eat";
    } else {
        category = "buy";
    }

    return category;
};

