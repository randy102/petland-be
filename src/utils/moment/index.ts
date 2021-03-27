import moment = require('moment')

export function Moment(inp?: moment.MomentInput): moment.Moment {
  return moment(inp)
}