/**
 * Created by Max on 12.03.2015.
 */
define(['mediator'],function(){
    var state = JSON.parse(localStorage.getItem('state')) || {
                scenarioCurrStep:0,
                scenarioCurrEvent:0,
                minerals:0,
                coins:0,
                currShip:'smallShip',
                shipShield:100,
                currBase:'defaultBase',
                currPlanet:0,
                enemiesKilled:0
            },
        reLoadState = function(){
           state = JSON.parse(localStorage.getItem('state')) || {};
        },
        saveState = function(){
            localStorage.setItem('state', JSON.stringify(state));
        };
    return state;
});