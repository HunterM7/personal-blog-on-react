import React from 'react'
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { IUser } from 'types'

interface ICommentCard {
  user: IUser
  text: string
}

const CommentCard: React.FC<ICommentCard> = ({
  user: { fullName, avatarUrl },
  text,
}) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={fullName} src={avatarUrl} />
        </ListItemAvatar>

        <ListItemText primary={fullName} secondary={text} />
      </ListItem>

      <Divider variant="inset" component="li" />
    </>
  )
}

export default CommentCard
