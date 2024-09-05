const webpack = require('webpack');
module.exports = {
    // other configuration...
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_SERVER_URLS': process.env.REACT_APP_SERVER_URLS
        })
    ]
};
