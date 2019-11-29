const pad = time => time.padStart(2, '0')

const getTimeStamp = () => {
  const date = new Date()
  const hours = pad(date.getHours().toString())
  const minutes = pad(date.getMinutes().toString())
  const secs = pad(date.getSeconds().toString())

  return `${hours}:${minutes}:${secs}`
}

const echo = (message, data) => data || message

const createLevel = (priority, color) => ({
  priority,
  color
})

const levels = {
  trace: createLevel(10, '#6699cc'),
  debug: createLevel(20, '#66cccc'),
  info: createLevel(30, '#99cc99'),
  warn: createLevel(40, '#ffcc66'),
  error: createLevel(50, '#f2777a')
}

const createLogger = ({ level = 'info', dev = !!__DEV__ } = {}) => {
  if (!levels[level]) throw Error('Invalid log level set')

  const log = level => {
    const { color } = levels[level]
    const css = `color:#fff;font-weight:bold;background-color:${color};padding:3px;`

    return (message = '', data = '') => {
      const messageIsString = typeof message === 'string'
      const dataOutput = !messageIsString ? message : data
      const messageOutput = !messageIsString ? '' : message

      const levelStringFormatted = level.toUpperCase().padEnd(6)
      const timeStampValue = getTimeStamp()

      const output = `%c${timeStampValue} ${levelStringFormatted}%c ${messageOutput}`

      console.log(output, css, 'color:inherit;', dataOutput)

      return dataOutput || messageOutput
    }
  }

  const getAllTypeOfLogs = (obj, current) => {
    const shouldLog = levels[current].priority >= levels[level].priority && dev

    const shouldLogResponse = shouldLog ? log(current) : echo

    return { ...obj, [current]: shouldLogResponse }
  }

  const logger = Object.keys(levels).reduce(getAllTypeOfLogs, {})

  return logger
}

export default createLogger
