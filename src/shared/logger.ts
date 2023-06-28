const logger = {
  log: (...params) => {
    if (process.env.NODE_ENV === "development") {
      console.log(...params)
    }
  },
  error: (...params) => {
    if (process.env.NODE_ENV === "development") {
      console.error(...params)
    }
  }
}

export default logger
