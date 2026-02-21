import express from 'express';
const app = express();
import './utils/dotenvHandler.js';
import { homeRouter } from './routes/homeRouter.js';

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if(error) {
    throw error
  };

  console.log(`Express is listening at port ${PORT}`)
})

app.use(homeRouter)

app.use((req, res) => {
  res.status(404).sendFile("/views/404.html", {root: import.meta.dirname});
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message || "Internal server error");
})