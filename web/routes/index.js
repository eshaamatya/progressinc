var rs = require('../misc/rs');

module.exports = function (ctx) {

    var data = {
        page: {title: 'Edushala'}
    };

    //Create route paths
  //  ctx.app.get('/', index);
   /* ctx.app.get('/about', function(req, res){
        res.render('about', {
            name: 'binod',
            hobby: 'stamp collecting',
            school: {
                name:'Pulchowk Campus'
            }
        });
    }); */

    ctx.app.get('/', function(req, res){
        data.page.title = 'Progress Inc - Home';
        res.render('index', data)
    });

    ctx.app.get('/Portfolio_d', function(req, res){
        data.page.title = 'Progress Inc - Portfolio_d';
        res.render('Portfolio_d', data)
    });
};