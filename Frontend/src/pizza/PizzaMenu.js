


var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $pizza_count = $("#pizza-count");
var $title_count = $("#count-title");


function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");


    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);


}
//https://github.com/MissFortuna/JS-Pizza/blob/master/Frontend/src/pizza/PizzaMenu.js
function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    var title="Усі піци";
    var counter = 0;
    if (filter === "all") {
        pizza_shown = Pizza_List;
        counter=8;
    }
    else if (filter === "vega") {
        Pizza_List.forEach(function (pizza) {
            if (pizza.type === 'Вега піца') {
                pizza_shown.push(pizza);
                counter++;
            }
        });
        title="Вега піца";
    }
    else if (filter === "meat") {
        Pizza_List.forEach(function (pizza) {
            if (pizza.type === 'М’ясна піца') {
                pizza_shown.push(pizza);
                counter++;
            }
        });
        title="М’ясна піца";
    }
    else if (filter === "pineapple") {
        Pizza_List.forEach(function (pizza) {
            if (pizza.content.pineapple) {
                pizza_shown.push(pizza);
                counter++;
            }
        });
        title="Піца з ананасом";
    }

    else if (filter === "mushroom") {
        Pizza_List.forEach(function (pizza) {
            if (pizza.content.mushroom) {
                pizza_shown.push(pizza);
                counter++;
            }
        });
        title="Піца з грибами";
    }

    else if (filter === "ocean") {
        Pizza_List.forEach(function (pizza) {
            if (pizza.content.ocean) {
                pizza_shown.push(pizza);
                counter++;
            }
        });
        title="Піца з морепродуктами";
    }
    showPizzaList(pizza_shown);

    $pizza_count.html("");
    $pizza_count.html(""+counter+"");
    $title_count.html("");
    $title_count.html(""+title+"");
}

$("#filter-button-all-pizza").click(function(){
    $(".allPizzas").text("Усі піцци:"+8);
    filterPizza('all');
});

$("#filter-button-meat").click(function(){
    $(".allPizzas").text("М'ясні піци:"+5);
    filterPizza("meat");
});


$("#filter-button-pineapples").click(function(){
    $(".allPizzas").text("Піци з ананасами:"+3);
    filterPizza('pineapple');
});


$("#filter-button-mushrooms").click(function(){
    $(".allPizzas").text("Піци з грибами:"+3);
    filterPizza('mushroom');
});


$("#filter-button-ocean").click(function(){
    $(".allPizzas").text("Піци з морепродуктами:"+2);
    filterPizza('ocean');
});


$("#filter-button-vega").click(function(){
    $(".allPizzas").text("Вегетаріанські піци:"+1);
    filterPizza('vega');
});

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;