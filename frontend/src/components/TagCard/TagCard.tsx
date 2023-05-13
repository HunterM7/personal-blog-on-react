import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material'
import { Tag as TagIcon } from '@mui/icons-material'

interface ITagCard {
  title: string | null
  path: string
}

const TagCard: React.FC<ITagCard> = ({ title = null, path }) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={path}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>

          {title ? (
            <ListItemText primary={title} />
          ) : (
            <Skeleton width={100} height={29} />
          )}
        </ListItemButton>
      </ListItem>
    </Link>
  )
}

export default TagCard
