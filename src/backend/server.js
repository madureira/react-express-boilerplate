import path from 'path';
import webpack from 'webpack';
import express from 'express';
import bodyParser from 'body-parser';
import config from 'root/webpack.config';

const app = express();
const ENV = process.env.NODE_ENV || process.argv[2] || 'development';
const SERVER_PORT = process.env.PORT || 3000;
const isProduction = ENV === 'production';

let instance;

if (!isProduction) {
  config.mode = 'development';
  const compiler = webpack(config);

  instance = require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    writeToDisk: true,
  });

  app.use(instance);
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.resolve(__dirname + '/../../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../static/index.html'));
});

const startServer = () => {
  app.listen(SERVER_PORT, () => {
    console.log(`\nServer is running at http://localhost:${SERVER_PORT}`);
  });
};

if (!isProduction) {
  instance.waitUntilValid(startServer);
} else {
  startServer();
}
