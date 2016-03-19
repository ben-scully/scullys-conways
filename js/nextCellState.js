var overPopulated = require('./overPopulated')
var underPopulated = require('./underPopulated')
var ressurectable = require('./ressurectable')

function nextCellState(cellState, neighbourCount) {
  if (!cellState)
    return ressurectable(neighbourCount)

  if (overPopulated(neighbourCount) || underPopulated(neighbourCount))
    return false

  return true
}

module.exports = nextCellState
