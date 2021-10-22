import { all } from 'redux-saga/effects'

//public


import LayoutSaga from './layout/saga';

//Calendar 
import calendarSaga from "./calendar/saga";

//chat
import chatSaga from "./chat/saga"

//Ecommerce saga
import ecommerceSaga from "./e-commerce/saga";

export default function* rootSaga() {
    yield all([
      //public
        LayoutSaga(),
        calendarSaga(),
        ecommerceSaga(),
        chatSaga(),
    ])
}