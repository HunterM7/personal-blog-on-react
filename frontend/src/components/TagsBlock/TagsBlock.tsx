import React from 'react'
import { List } from '@mui/material'

// Utils
import { TAGS_URL } from 'utils/routes'

// Components
import { SideBlock, TagCard } from 'components'

interface ITagsBlock {
  items?: string[] | null
}

const TagsBlock: React.FC<ITagsBlock> = ({ items = null }) => {
  const fakeTags = Array(5).fill(null) as null[]

  return (
    <SideBlock title="Тэги">
      <List>
        {(items ? items : fakeTags).map((tag, i) => (
          <TagCard key={i} title={tag} path={`${TAGS_URL}/${tag || ''}`} />
        ))}
      </List>
    </SideBlock>
  )
}

export default TagsBlock
