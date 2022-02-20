const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const userController = require('./controllers/userController');
const errorMiddlewares = require('./middlewares/errors');
const middlewareAuth = require('./middlewares/auth');

app.use(bodyParser.json());

app.use('/user', userController);

app.use(middlewareAuth);

app.use(errorMiddlewares.joiError);
app.use(errorMiddlewares.domainError);
app.use(errorMiddlewares.internalError);

app.listen(port, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
