(function (global) {
    System.config({
        paths: {
            "npm:": "node_modules/"
        },
        map: {
            app: "app",
            // angular bundles
            "@angular/core": "npm:@angular/core/bundles/core.umd.js",
            "@angular/common": "npm:@angular/common/bundles/common.umd.js",
            "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
            "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
            "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            "@angular/http": "npm:@angular/http/bundles/http.umd.js",
            "@angular/router": "npm:@angular/router/bundles/router.umd.js",
            "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // other libraries
            "rxjs":                       "npm:rxjs",
            "jquery":                     "npm:jquery/dist/jquery.min.js",
            "semantic":                   "vendor/semantic.min.js",
            "ng-semantic":                "npm:ng-semantic",
        },
        packages: {
            app: {
                main: "./main.js",
                defaultExtension: "js"
            },
            rxjs: {
                defaultExtension: "js"
            },
            "ng-semantic": {
                main: "ng-semantic",
                defaultExtension: "js"
            },
            "contra": {
                main: "debounce",
                defaultExtension: "js"
            },
        }
    });
})(this);
