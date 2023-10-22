import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoadingPosts: false,
	posts: [],
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPostsToStore: (state, actions) => {
			const { posts, loaded } = actions.payload
			state.posts = posts
			state.isLoadingPosts = loaded
			console.log(state.posts)
		},
	},
})

export const { addPostsToStore } = postsSlice.actions
export default postsSlice.reducer
