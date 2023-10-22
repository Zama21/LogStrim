import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsReducer'
import usersReducer from './usersReducer'

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer,
	},
})
