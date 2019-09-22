var express = require('express');
var mysql = require('mysql');
var router = express.Router();
      var conexion = require('C:/Users/Fredy-pc/Documents/AlibetsNode/alibets/public/javascripts/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  conexion.connect(function(err){
    conexion.query("select * from apuesta order by id desc limit 7", function(err, result, fields){
      if(err){
        throw err;
      } else{
        console.log(result);
        res.render('index', { title: 'AliBets', data: result });
      }
      
    });
  });
  
});
router.get('/newArticle', function(req, res, next){
  res.render('newArticle');
});

router.post('/guardarArticulo', function(req, res){
  var titulo = req.body.titulo;
  var epigrafe = req.body.epigrafe;
  var texto = req.body.texto;
  var categorias = req.body.categorias;
  var sql = "insert into articulo(titulo, epigrafe, texto, categoria) values ('"+ titulo + "','" + epigrafe + "','" + texto + "','" + categorias + "')";
  conexion.query(sql, function(err, result){
    if(err) throw err;
    console.log("Registro correcto");
  });
  res.redirect('/newArticle');
});

router.get('/newPick', function(req, res, next){
  res.render('newPick');
});

router.post('/guardarPick', function(req, res){
  var evento = req.body.evento;
  var linea = req.body.linea;
  var deporte = req.body.deporte;
  var pick = req.body.pick;
  var fecha = req.body.fecha;
  var texto = req.body.texto;
  var liga = req.body.liga;
  var overunder = req.body.overunder;
  var hora = req.body.hora;
  var sql = "insert into apuesta(deporte, liga, fecha, evento, linea, pick, comentario, overunder, hora) values ('"+ deporte + "','" + liga + "','" + fecha + "','" + evento + "','"+ linea +"','"+ pick + "','"+ texto+"','" + overunder +"','" +  hora + "')";
  conexion.query(sql, function(err, result){
    if(err) throw err;
    console.log("Registro correcto");
  });
  res.redirect('/newPick');
});

router.get('/articulo/:id', function(req, res){
  var id = req.params.id;
  var sql = "select * from articulo where id= " + id;
  conexion.query(sql, function(err, result, fields){
    if(err){
      throw err;
      res.send('Error 404');
    }else{
      res.render('articulo', {data:result});
    }
  })
});
router.get('/pick/:id', function(req, res){
  var id = req.params.id;
  var sql = "select * from apuesta where id= " + id;
  conexion.query(sql, function(err, result, fields){
    if(err){
      throw err;
      res.send('Error 404');
    }else{
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        console.log("fecha: " + row.fecha);
      });
      res.render('pick', {data:result});
    }
  })
});

router.get('/picks/:deporte', function(req, res){
  var deporte = req.params.deporte;
  console.log(deporte);
  var sql = "select * from apuesta where deporte = '" + deporte + "'";
  conexion.query(sql, function(err, result, fields){
    if(err){
      throw err;
    }else{
      res.render('buscar_pick', {data:result});
    }
  });
});

router.get('/articulos/glosario', function(req, res){
  res.render('glosario');
});
router.get('/articulos/:categoria', function(req, res){
  var categoria = req.params.categoria;
  var sql = "select * from articulo where categoria like '%" + categoria + "%'";
  if(categoria == 'conceptos-basicos'){
    categoria = 'Conceptos Básicos';
  }else if(categoria == 'juego-responsable'){
    categoria = 'Juego Responsable';
  }
  conexion.query(sql, function(err, result, fields){
    if(err){
      throw err;
    }else{
      res.render('buscar_articulo', {data:result, categoria: categoria});
    }
  });
});

module.exports = router;

