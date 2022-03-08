const express = require('express');
const mongoose = require('mongoose');
const my_app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

my_app.listen(port, () => {
  console.log('Listening for the port', port);
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Conectados con mongoDB'))
  .catch((error) => console.error(error));

/* Endpoint: http://localhost:3000/home
parte estática: http://localhost:3000
parte dinamica:/home */
my_app.get('/home', (req, res) => {
  res.send('Accediendo a mi primer Endpoint');
});

/* http://localhost:3000/api/v1/home */
my_app.get('/api/v1/home', (req, res) => {
  res.json({
    person_id: '123244',
    person_name: 'Yaneth Mejía',
    course: 'Electiva II',
    current_year: 2022,
  });
});

/* Consultar TODOS los registros existentes en una DB
Ejemplo hardcodeado => utiliza datos quemados
Endpoint: http://localhost:3000/api/v1/products */
my_app.get('/api/v1/products', (req, res) => {
  res.json([
    {
      product_id: 'oxo11223344',
      product: 'Tennis',
      brand: 'Adidas',
      reference: {
        number: 1234,
        size: {
          option1: { size1: 36, color: ['Azul', 'Blanco', 'Rojo'] },
          option2: { size1: 37, color: ['Negro', 'Blanco', 'Rojo'] },
          option3: { size1: 38, color: ['Morado', 'Blanco', 'Rojo'] },
        },
      },
    },
    {
      product_id: 'oxo223344555',
      product: 'Tennis',
      brand: 'Adidas Running',
      reference: {
        number: 9898,
        size: {
          option1: {
            size: 40,
            color: [
              (opt1 = { color: 'Azul', available: true }),
              (opt2 = { color: 'Blanco', available: false }),
              (opt3 = { color: 'Negro', available: true }),
            ],
          },
          option2: {
            size: 41,
            color: [
              (opt1 = { color: 'Azul', available: true }),
              (opt2 = { color: 'Blanco', available: false }),
            ],
          },
        },
      },
    },
  ]);
});

/* Consultar un recurso especifico
http://localhost:3000/api/v1/products/cualquier_valor */
my_app.get('/api/v1/products/:productId', (req, res) => {
  const { productId } = req.params;
  res.json({
    productId,
    product: 'Tennis',
    brand: 'Adidas',
    reference: {
      number: productId,
      size: {
        option1: { size1: 36, color: ['Azul', 'Blanco', 'Rojo'] },
        option2: { size1: 37, color: ['Negro', 'Blanco', 'Rojo'] },
        option3: { size1: 38, color: ['Morado', 'Blanco', 'Rojo'] },
      },
    },
  });
});

/* Crear un endpoint que recibe dos parametros en la URI
Endpoint: http://localhost:3000/api/v1/categories/male/products/ref_running123 */
my_app.get('/api/v1/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    category_name: 'Tennis Running',
    productId,
    product_name: 'XZIG',
  });
});

/* Crear un endpoint con un parametro opcional
Endpoint con parametro: http://localhost:3000/api/v1/products_opt?productId=cualquier_valor
Endpoint sin parametro: http://localhost:3000/api/v1/products_opt */
my_app.get('/api/v1/products_opt', (req, res) => {
  const { productId } = req.query;
  if (productId) {
    res.json({
      productId,
      product_name: 'XZIG',
    });
  } else {
    res.send('El usuario no ingreso la referencia del tennis');
  }
  /* Operadores ternarios en vez de estructura convencional del IF */
  productId
    ? res.json({
        productId
      })
    : res.send('El usuario no ingreso la referencia del tennis');
});
