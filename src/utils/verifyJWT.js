import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization.replace('Bearer ', '')
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })

    req.userId = decoded.id
    next()
  })
}
