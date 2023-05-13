import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Tag as TagIcon } from '@mui/icons-material'

interface ITagCard {
  title: string
  path: string
}

const TagCard: React.FC<ITagCard> = ({ title, path }) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={path}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>

          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}

export default TagCard
