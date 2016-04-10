/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    var API = require("./API");
    API.getPizzaList(function(err, pizza_list){
        if(err){
            return console.error(err);
        }

        console.log("Pizza_List",pizza_list);
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    });

    $(".button-order").click(function(){
        window.location = "/order.html";
        $(this).hide();
        API.createOrder({
            name: "Name",
            phone: "Phone",
            pizza: PizzaCart.getPizzaInCart()
        }, function(err, result){
            if(err) {
                alert("Can't create order");
            } else {
                // это как раз перенаправляет на страничку заказа, просто создать такой потом файл и убедишься
                window.location = "/order.html";
                //удалять хтмл файлики не нужно
                //alert("Order created");
            }
        });


    });

require('./GoogleMap');

});