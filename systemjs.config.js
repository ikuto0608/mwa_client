/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                       'npm:rxjs',
            'jquery':                     'npm:jquery/dist/jquery.min.js',
            'semantic':                   'vendor/semantic.min.js',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'angular2-jwt':               'npm:angular2-jwt/angular2-jwt.js',
            'ng-semantic':                'npm:ng-semantic',
            'dragula':                    'npm:dragula/dist/dragula.js',
            'ng2-dragula':                'npm:ng2-dragula',
            //'contra':                     'npm:contra',
            //'contra/emitter':             'npm:contra/emitter.js',
            //'crossvent':                  'npm:crossvent/dist/crossvent.js',
            //'atoa':                       'npm:atoa/atoa.js',
            //'ticky':                      'npm:ticky/ticky.js',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng-semantic': {
                main: 'ng-semantic',
                defaultExtension: 'js'
            },
            'contra': {
                main: 'debounce',
                defaultExtension: 'js'
            },
            'ng2-dragula': {
              'format': 'cjs',
              'main': 'ng2-dragula',
              'defaultExtension': 'js'
            },
        }
    });
})(this);
