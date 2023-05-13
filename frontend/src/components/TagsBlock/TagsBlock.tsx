import React from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Skeleton,
} from '@mui/material'
import { Tag as TagIcon } from '@mui/icons-material'

// Components
import { SideBlock, TagCard } from 'components'
import { TAGS_URL } from 'utils/routes'

interface ITagsBlock {
  items?: string[] | null
}

const TagsBlock: React.FC<ITagsBlock> = ({ items = null }) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {items
          ? items.map((tag, i) => (
              <TagCard
                key={`${tag}-${i}`}
                title={tag}
                path={`${TAGS_URL}/${tag}`}
              />
            ))
          : [...Array(5).keys()].map((_, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>

                  <Skeleton width={100} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </SideBlock>
  )
}

export default TagsBlock
