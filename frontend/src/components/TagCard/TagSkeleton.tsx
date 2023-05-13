import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, Skeleton } from '@mui/material'
import { Tag as TagIcon } from '@mui/icons-material'

const TagSkeleton: React.FC = () => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>

        <Skeleton width={100} />
      </ListItemButton>
    </ListItem>
  )
}

export default TagSkeleton
