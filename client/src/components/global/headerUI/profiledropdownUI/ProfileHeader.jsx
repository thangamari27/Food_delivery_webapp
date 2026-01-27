
function ProfileHeader({ userData, styles }) {
  return (
     <div className={styles.container}>
        <div className={styles.innerContainer}>
        <div className={styles.avatar}>
            { userData.name.charAt(0).toUpperCase() || 'CU'}
        </div>
        <div className={styles.userInfo}>
            <p className={styles.name}>{userData.name}</p>
            <p className={styles.email}>{userData.email}</p>
        </div>
        </div>
    </div>
  )
}

export default ProfileHeader