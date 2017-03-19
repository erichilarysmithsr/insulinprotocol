import rollup      from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

export default {
  entry: 'src/main.js',
  dest: 'src/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    // // intercepts in some rollup versions
    if ( warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

    // console.warn everything else
    console.warn( warning );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: ['node_modules/rxjs/**','node_modules/angular2-jwt/angular2-jwt.js']
      })
  ]
};
