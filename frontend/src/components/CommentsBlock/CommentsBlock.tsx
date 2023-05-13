import React from 'react'
import { List } from '@mui/material'

// Types
import { IComment } from 'types'

// Components
import { SideBlock } from 'components'
import CommentPlug from 'components/CommentCard/CommentPlug'
import CommentCard from 'components/CommentCard/CommentCard'

interface ICommentsBlock {
  items: IComment[]
  isLoading: boolean
}

const CommentsBlock: React.FC<React.PropsWithChildren<ICommentsBlock>> = ({
  items,
  children,
  isLoading = false,
}) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {isLoading
          ? [...Array(5).keys()].map((_, index) => <CommentPlug key={index} />)
          : items.map(obj => <CommentCard key={obj.user._id} {...obj} />)}
      </List>

      {children}
    </SideBlock>
  )
}

export default CommentsBlock
