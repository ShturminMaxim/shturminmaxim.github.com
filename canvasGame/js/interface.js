define(['jquery','canvas','redrawer','player', 'map'], function($, canvas, redrawer, player, map){
    //real will be
    var inventory;
    var spriteUrl = './img/items.png';
    var inventoryContainer = $('ul.inventory-items');
    //var inventoryItem = $('<li class="inventory-item"></li>');
    //mock inventory
    //var inventory = [];
    var items = [
        {
            id:0,
            name:'map',
            settings:{
                coords:[442,2]
            }
        },
        {
            id:1,
            name:'key',
            settings:{
                coords:[4,1]
            },
            quantity:1
        },
        {
            id:15,
            name:'peaceOfGold',
            settings:{
                coords:[0,33,37]
            },
            quantity:1
        }
    ];

    function addItem(id){
        inventory =  player.getItems();
        var itemPresent = false;

        for(var i = 0; i<inventory.length; i += 1) {
            if(inventory[i].id === items[id].id) {
                inventory[i].quantity += 1;
                itemPresent = true;
                break;
            }
        }
        if(!itemPresent) {inventory.push(items[id]);}
        updateInventory();
    };
    function removeItem(itemId){
        inventory =  player.getItems();
        var length = inventory.length;
        for(var i = 0; i<length; i += 1) {
            if(inventory[i].id === itemId) {
                inventory.splice(i,1);
                updateInventory();
                break;
            }
        }
    }
    function addToInterface(elem){
        var quantity = elem.quantity || "";
        var inventoryItem = $('<li class="inventory-item"><span>'+quantity+'</span></li>');
        var x = elem.settings.coords[0];
        var y = elem.settings.coords[1];
        var width = elem.settings.coords[2];
        var elemClass = elem.name;
        inventoryItem.css({'background':'url('+spriteUrl+')','background-position': x+'px '+y+'px'});
        if(width) {
            inventoryItem.css({'width': width+'px'});
        }
        inventoryItem.addClass(elemClass);
        inventoryContainer.append(inventoryItem)
    }
    function updateInventory(){
        var length = inventory.length;
        var elem;

        if(length) {
            //clear inventory before update
            inventoryContainer.find('li').remove();

            for(var i = 0; i < length; i += 1) {
                addToInterface(inventory[i]);
            }
        }
        player.updateInventory(inventory);
    }
    setTimeout(function(){
        addItem(0);
    });
    return {
        addItemToInvetory: addItem,
        removeItemFromInventory : removeItem
    };
})