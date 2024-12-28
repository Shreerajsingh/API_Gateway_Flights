const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const limiter = rateLimit({
    windowMs: 2*60*100,     // Every 2 minutes
    max: 3                  // Limit each IP to 3 request per 'window'
})


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);

app.use('/flightsService', createProxyMiddleware(
    {
        target: ServerConfig.FLIGHTS_SERVICE,
        changeOrigin: true,
        pathRewrite: {
            '^/flightsService': '/'
        }
    })
);
    
app.use('/bookingService', createProxyMiddleware(
    {
        target: ServerConfig.BOOKING_SERVICE,
        changeOrigin: true,
        pathRewrite: {
            '^/bookingService': '/'
        }
    })
);

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});