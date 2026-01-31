import { useAuth } from "../context/AuthContext"

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={user.avatar} alt="avatar" />

        <div>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>

          <div className="profile-stats">
            <span><b>{user.posts}</b> posts</span>
            <span><b>{user.followers}</b> followers</span>
            <span><b>{user.following}</b> following</span>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <p>PRN: {user.prn}</p>
        <p>Passout Year: {user.passoutYear}</p>
        <p>Total Contributions: {user.contributions}</p>
      </div>
    </div>
  )
}