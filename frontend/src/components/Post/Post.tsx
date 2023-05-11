import React from 'react'
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
          <a href={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>

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
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
          </h2>

          <ul className={styles.tags}>
            {tags.map(name => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
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
