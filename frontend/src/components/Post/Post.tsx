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
import { IUser } from 'types'

// Utils
import { POSTS_URL, TAGS_URL } from 'utils/routes'

// Components
import { UserInfo, PostSkeleton } from 'components'

// Styles
import styles from './Post.module.scss'

interface IPost {
  _id: number
  title: string
  createdAt: string
  imageUrl: string
  user: IUser
  viewsCount: number
  commentsCount: number
  tags: string[]
  isFullPost: boolean
  isLoading: boolean
  isEditable: boolean
}

const Post: React.FC<React.PropsWithChildren<IPost>> = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  isFullPost,
  isLoading,
  isEditable,
  children,
}) => {
  if (isLoading) {
    return <PostSkeleton />
  }

  const onClickRemove = () => {
    console.log('click remove')
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`${POSTS_URL}/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />

        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? (
              title
            ) : (
              <Link to={`${POSTS_URL}/${_id}`}>{title}</Link>
            )}
          </h2>

          <ul className={styles.tags}>
            {tags.map(name => (
              <li key={name}>
                <Link to={`${TAGS_URL}/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>

          {children && <div className={styles.content}>{children}</div>}

          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
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

export default Post