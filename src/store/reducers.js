import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';

import Layout from './layout/reducer';
import { alertsReducer } from './alerts/reducer';
import { userReducer } from './user/reducer';
import { cmsReducer } from './cms/reducer';
import { categoryReducer } from './category/reducer';
import { productReducer } from './product/reducer';

const rootReducer = combineReducers({
    // public
    Layout,
    auth: authReducer,
    alert: alertsReducer,
    user: userReducer,
    cms: cmsReducer,
    category: categoryReducer,
    product: productReducer
});

export default rootReducer;