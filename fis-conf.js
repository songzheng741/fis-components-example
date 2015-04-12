var path  = require('path');

fis.config.set('settings.postprocessor.jswrapper.type', 'amd');

fis.config.set('namespace', 'iris');

// 更多 roadmap.path 配置，请查看 http://fis.baidu.com/docs/advance/roadmap.html
fis.config.set('roadmap.path', [
    {
        reg: '/static/js/mod.js',
        isMod: false
    },

    {
        reg: '/static/js/main.js',
        isMod: false
    },

    {
        reg: 'components/**/*.js',
        isMod: true
    },
    {
        reg: 'static/**/*.js',
        isMod: true
    },
    {
        reg: /^\/components\/(.+\.(vm|jsp))$/i,
        isMod: true,
        url: '/${namespace}/$1',
        release: '/WEB-INF/views/${namespace}/$1',
        extras: {
            isPage: true
        }
    },
    {
        reg: 'components/**/*.css',
        isMod: true
    },

    // 下划线打头的一般都是被 inline 的文件，所以不需要发布，同时也不需要优化处理。
    {
        reg: '**/_*.*',
        release: false,
        useAMD: false,
        useOptimizer: false
    },

    // 不是 isMode 不会在 map.json 里面。
    // 依靠它来读取 html 文件的依赖。
    {
        reg: '**.html',
        isMod: true
    },
    {
        reg: /^\/page\/(.+\.(vm|jsp))$/i,
        isMod: true,
        url: '/${namespace}/$1',
        release: '/WEB-INF/views/${namespace}/$1',
        extras: {
            isPage: true
        }
    },
    {
        reg : '${namespace}-map.json',   //map.json发布到map目录下
        release : 'map/$&'
    }
].concat(fis.config.get('roadmap.path', [])));

fis.config.set('modules.postprocessor.html', 'require-async');
fis.config.set('modules.postprocessor.js', 'jswrapper, require-async');

// 开起 autuload, 好处是，依赖自动加载。
fis.config.set('modules.postpackager', 'autoload');


// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');
fis.config.set('pack', {
    'pkg/index.css': 'index.vm',
    'pkg/index.js': 'index.vm'
});