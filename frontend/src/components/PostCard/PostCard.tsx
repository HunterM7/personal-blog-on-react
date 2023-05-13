import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { IconButton } from '@mui/material'
import {
  Clear as DeleteIcon,
  Edit as EditIcon,
  RemoveRedEyeOutlined as EyeIcon,
  ChatBubbleOutlineOutlined as CommentIcon,
} from '@mui/icons-material'

// Types
import { IPost } from 'types'

// Utils
import { POSTS_URL, TAGS_URL } from 'utils/routes'

// Components
import { UserInfo, PostSkeleton } from 'components'

// Styles
import styles from './PostCard.module.scss'

interface IPostCard {
  post: IPost | null
  commentsCount: number
  isFullPost?: boolean
  isEditable: boolean
}

const PostCard: React.FC<IPostCard> = ({
  post,
  commentsCount,
  isFullPost = false,
  isEditable,
}) => {
  if (!post) {
    return <PostSkeleton />
  }

  const onClickRemove = () => {
    console.log('click remove')
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`${POSTS_URL}/${post._id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {post.imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={post.imageUrl}
          alt={post.title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...post.user} additionalText={post.createdAt} />

        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? (
              post.title
            ) : (
              <Link to={`${POSTS_URL}/${post._id}`}>{post.title}</Link>
            )}
          </h2>

          <ul className={styles.tags}>
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`${TAGS_URL}/${tag}`}>#{tag}</Link>
              </li>
            ))}
          </ul>

          {isFullPost && <div className={styles.content}>{post.text}</div>}

          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{post.viewsCount}</span>
            </li>

            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PostCard
