import Page from './components/Page'
import MainHeader from './components/MainHeader'
// import Footer from './components/Footer'
import Content from './components/Content'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPostsToStore } from './store/postsReducer'
import { addUsersToStore } from './store/usersReducer'
import Post from './components/Post'

function App() {
	// const [posts, setPosts] = useState([])
	const dispatch = useDispatch()
	const posts = useSelector(state => state.posts.posts)
	const users = useSelector(state => state.users.users)

	useEffect(() => {
		fetchPostsHandler()
	}, [])

	const fetchPostsHandler = async () => {
		const responsePosts = await fetch(
			'https://jsonplaceholder.typicode.com/posts'
		)
		const dataPosts = await responsePosts.json()

		const responseUsers = await fetch(
			'https://jsonplaceholder.typicode.com/users'
		)
		const dataUsers = await responseUsers.json()
		dispatch(addPostsToStore({ loaded: true, posts: dataPosts }))
		dispatch(addUsersToStore({ loaded: true, users: dataUsers }))
	}

	return (
		<Page>
			<MainHeader></MainHeader>
			<Content>
				{posts?.map(post => (
					<Post
						key={post.id}
						name={users.find(item => item.id === post.userId).name}
						title={post.title}
						body={post.body}
					></Post>
				))}
			</Content>

			{/* <Footer></Footer> */}
		</Page>
	)
}

export default App
