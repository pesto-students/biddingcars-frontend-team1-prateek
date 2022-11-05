import authReducer from './auth.reducer'
import { combineReducers } from 'redux'
import timelineReducer from './timeline.reducer'
import userinfoReducer from './userinfo.reducer'
import usersReducer from './users.reducer'

const rootReducer = combineReducers({
	auth: authReducer,
	timeline:timelineReducer,
	userinfo:userinfoReducer,
	users:usersReducer,
})

export default rootReducer