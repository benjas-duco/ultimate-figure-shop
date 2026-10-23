module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        files: [
            {
                pattern: 'src/data/**/*.js',
                type: 'module',
                included: false,
                served: true,
                watched: true,
            },
            {
                pattern: 'src/utils/**/*.js',
                type: 'module',
                included: false,
                served: true,
                watched: true,
            },
            {
                pattern: 'tests/**/*.spec.js',
                type: 'module',
                included: true,
                served: true,
                watched: true,
            },
        ],

        reporters: ['progress'],
        browsers: ['ChromeHeadless'],
        singleRun: true,
        autoWatch: false,
    })
}