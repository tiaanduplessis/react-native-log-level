const isDEV = !!__DEV__

const pad = time => time.padStart(2, '0')

function getTimeStamp () {
  const date = new Date()
  const hours = pad(date.getHours().toString())
  const minutes = pad(date.getMinutes().toString())
  const secs = pad(date.getSeconds().toString())
  return `${hours}:${minutes}:${secs}`
}

function echo (message, data) {
  return data || message
}

const levels = {
  trace: { priority: 10, color: '#6699cc' },
  debug: { priority: 20, color: '#66cccc' },
  info: { priority: 30, color: '#99cc99' },
  warn: { priority: 40, color: '#ffcc66' },
  error: { priority: 50, color: '#f2777a' }
}

function createLogger ({ level = 'info' } = {}) {
  if (!levels[level]) {
    throw Error('Invalid log level set')
  }

  const logger = {}

  const log = level => {
    const { color } = levels[level]
    const css = `color: #fff;font-weight:bold; background-color: ${color}; padding: 3px 3px;`

    return (message = '', data = '') => {
      if (typeof message !== 'string') {
        data = message
        message = ''
      }

      const output = `%c${getTimeStamp()} ${level
        .toUpperCase()
        .padEnd(6)}%c ${message}`
      console.log(output, css, 'color: inherit;', data)
      return data || message
    }
  }

  for (let current in levels) {
    const shouldLog =
      levels[current].priority >= levels[level].priority && isDEV
    logger[current] = shouldLog ? log(current) : echo
  }

  return logger
}

export default createLogger
