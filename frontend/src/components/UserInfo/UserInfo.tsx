import React from 'react'

// Styles
import styles from './UserInfo.module.scss'

interface IUserInfo {
  avatarUrl?: string
  fullName: string
  additionalText: string
}

const UserInfo: React.FC<IUserInfo> = ({
  avatarUrl = '/noavatar.png',
  fullName,
  additionalText,
}) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl} alt={fullName} />

      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}

export default UserInfo
