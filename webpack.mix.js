let mix = require('laravel-mix');
const path = require('path');

mix
    .setPublicPath('dist')
    .js('src/js/app.js', 'dist/js')
    .sass('src/scss/app.scss', 'dist/css')
    .options({
        processCssUrls: false,
        postCss: [
            require('autoprefixer')({
                cascade: false,
            }),
            require('postcss-sort-media-queries'),
        ],
        terser: {
            extractComments: false,
        },
        cssNano: true,
        manifest: false
    })
    .sourceMaps(false, "inline-source-map")
    .version();

mix.browserSync({
    open: false,
    server: {
        baseDir: path.normalize(__dirname),
        index: "index.html",
    },
    files: [
        '**/*.css',
        '**/*.scss',
        '**/*.js',
        '**/*.html',
        '**/*.php',
    ]
});

mix.webpackConfig({
    stats: {
        children: true
    }
});
