const errorMiddleware = (err, req, res, next) => {
  res.json({ message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null })
  const stateCode = res.stateCode ? res.stateCode : 500;
  res.status(stateCode)

}

module.exports = errorMiddleware;