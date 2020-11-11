import Layout from '@core/modules/Layout/Layout';
import LayoutUI from '@core/modules/Layout/LayoutUI';

const layoutUI = new LayoutUI();

const moduleData = {
    ui: layoutUI
};

const layout = new Layout(moduleData);

export default layout;