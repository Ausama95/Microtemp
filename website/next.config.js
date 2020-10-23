/* const { dirname } = require('path')
const path = require('path')
const { config } = require('path')

module.exports = {
    webpack: config => {
        config.resolve.alias['components'] = path.join( dirname, 'components')
        config.resolve.alias['public'] = path.join( dirname, 'public')

        return config
    }
} */