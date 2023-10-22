import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoadingUsers: false,
	users: [],
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUsersToStore: (state, action) => {
			const { users, loaded } = action.payload
			state.users = users
			state.isLoadingUsers = loaded
			console.log(state.users)
		},
	},
})

export const { addUsersToStore } = usersSlice.actions
export default usersSlice.reducer
