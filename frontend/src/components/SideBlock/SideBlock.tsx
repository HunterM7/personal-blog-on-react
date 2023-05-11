import React from 'react'
import { Paper, Typography } from '@mui/material'

// Styles
import styles from './SideBlock.module.scss'

interface ISideBlock {
  title: string
}

const SideBlock: React.FC<React.PropsWithChildren<ISideBlock>> = ({
  title,
  children,
}) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>

      {children}
    </Paper>
  )
}

export default SideBlock
