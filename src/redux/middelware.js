import { logger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import {applyMiddleware } from 'redux'

export const middleware = applyMiddleware(promise, logger)