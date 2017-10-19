import createLogger from './'
import makeConsoleMock from 'consolemock'

global.console = makeConsoleMock()

function logMultiple(log, message = 'none') {
    log.trace(message)
    log.debug(message)
    log.info(message)
    log.warn(message)
    log.error(message)
}

test('should be defined', () => {
    expect(createLogger).toBeDefined()
})

test('should return new instance', () => {
    const log = createLogger()
    expect(log).toBeDefined()
    expect(log.info).toBeDefined()
    expect(log.error).toBeDefined()
})

test('should log to console', () => {
    console.clearHistory()
    const log = createLogger({ level: 'trace' })
    logMultiple(log)
    expect(console.history().length).toBe(5)
})

test('should log based on level', () => {
    console.clearHistory()
    const log = createLogger({ level: 'warn' })
    logMultiple(log)
    expect(console.history().length).toBe(2)
})
