const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#2086C4',
                            '@border-radius-base': '5px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};