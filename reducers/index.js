import authReducer from './auth.reducer'
import { combineReducers } from 'redux'
import timelineReducer from './timeline.reducer'

const rootReducer = combineReducers({
	auth: authReducer,
	timeline:timelineReducer
})

export default rootReducer