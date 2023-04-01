import PropTypes from 'prop-types'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 32,
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 32,
}

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (successMessage){
    return (
      <div id='success' style={success}>
        {successMessage}
      </div>
    )
  } else {
    return (
      <div id='error' style={error}>
        {errorMessage}
      </div>
    )
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
}

export default Notification