const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
        config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
        config = rewireLess(config, env, {
        modifyVars: { 
          "@primary-color": "#1DA57A" ,
          '@layout-header-background': '#1d2b35',
          '@menu-dark-submenu-bg': '#283742',
          '@layout-trigger-background': '#1d2b35'
        },
   });
    return config;
  };