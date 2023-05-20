import React from 'react'

function Alert() {
  return (
<div className="alert alert-warning alert-dismissible fade show mt-5" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  )
}

export default Alert
