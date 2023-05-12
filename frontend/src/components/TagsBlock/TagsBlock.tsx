import React from 'react'
import { Link } from 'react-router-dom'
import { Tag as TagIcon } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material'

// Components
import { SideBlock } from 'components'
import { TAGS_URL } from 'utils/routes'

interface ITagsBlock {
  items: string[]
  isLoading: boolean
}

const TagsBlock: React.FC<ITagsBlock> = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link
            key={i}
            style={{ textDecoration: 'none', color: 'black' }}
            to={`${TAGS_URL}/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>

                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  )
}

export default TagsBlock
