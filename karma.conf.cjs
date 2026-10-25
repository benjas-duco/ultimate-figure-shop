module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        files: [
            { pattern: 'src/data/products.js', type: 'module', included: false, served: true, watched: true },
            { pattern: 'src/utils/**/*.js', type: 'module', included: false, served: true, watched: true },
            { pattern: 'tests/**/*.spec.js', type: 'module', included: true, served: true, watched: true },
        ],

        preprocessors: {
            'src/utils/**/*.js': ['coverage'],
            'src/data/**/*.js': ['coverage']
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        browsers: ['ChromeHeadless'],
        singleRun: true,
        autoWatch: false,
    })
}