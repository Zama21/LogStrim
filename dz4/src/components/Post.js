import styles from './Post.module.css'

function Post(props) {
	return (
		<div className={styles.card}>
			<div className={styles['card-user-name']}>{props.name}</div>
			<h3 className={styles['card-title']}>{props.title}</h3>
			<p className={styles['card-content']}>{props.body}</p>
		</div>
	)
}

export default Post
