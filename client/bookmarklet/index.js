import getAllElementsWithAttribute from './utils/getAllElementsWithAttribute';
import getPositionAndSize from './utils/getPositionAndSize';

var oatConfig = window.__OATCONFIG || {
  plugins: []
};

function loadDependencies(plugins) {

}

function initializeBookmarklet(oatConfig) {

}

loadDependencies(oatConfig.plugins);
initializeBookmarklet(oatConfig);
