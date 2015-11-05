/**
 * Created by Max on 06.03.2015.
 */
define(function(){
   var levelMock = {
       number:1,
       name:'Earth',
       planet:'earth',
       stars:true,
       asteroids:true,
       background:'skymap',
       enemies:{
           types:['smallShip'],
           randomPosition:false,
           maxEnemies:4
       },
       enemyBase:{
           type:'MainBigBase',
           randomCoords:false,
           coords:{
               x:500,
               y:500
           },
           enemiesSpawnSpeed:4000
       },
       shipStartPosition:{
           x:200,
           y:200
       }
   }
});