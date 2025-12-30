import { Link } from 'react-router-dom'

function Button({ buttonText, buttonLink, buttonStyle }) {
  return (
    <button className={buttonStyle}>
        <Link to={buttonLink}>
            {buttonText}
        </Link>
    </button>
  )
}

export default Button