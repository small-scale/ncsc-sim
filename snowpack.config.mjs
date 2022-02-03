export default {
  mount: {
    src: '/',
    static: '/static',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
    "devOptions": {
        "port": 8000
      },
      exclude:[`node_modules/**/*`, `yarn.lock`, 'package.json', 'snowpack.config.js']
    //  "plugins": [["@snowpack/plugin-webpack"]],
}
