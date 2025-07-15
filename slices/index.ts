import { combineReducers } from 'redux';
import globalReducer from '@/slices/global';



const rootReducer = combineReducers({
    global: globalReducer,
})
export default rootReducer