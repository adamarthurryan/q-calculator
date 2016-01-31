/** methods for displaying and manipulating q-numbers */

function fromFloat(float, length=32, wholeLength=0) {

  let isNeg = float < 0

  let wholePart = Math.floor(Math.abs(float))
  let fractPart = Math.abs(float)-wholePart

  let wholeBits = []
  let wholePartRem = wholePart
  for (let i=0;i<wholeLength;i++) {
    let bit = wholePartRem % 2
    wholeBits.push(bit)
    wholePartRem = (wholePartRem-bit) /2
  }

  if (wholePartRem>0)
    throw new Error(`overflow whole bits: ${wholePartRem} did not fit in ${wholeLength} bits`)

  let fractBits = []
  let fractPartRem = fractPart
  for (let i=0;i<length-1-wholeLength;i++) {
    let bit = (fractPartRem >= 0.5) ? 1 : 0
    if (bit==1) 
      fractPartRem -= 0.5
    fractPartRem *= 2
    fractBits.push(bit)
  }

  if (isNeg) {
    wholeBits = wholeBits.map(b => 1-b)
    fractBits = fractBits.map(b => 1-b)
  }
  
  let negBits = [(isNeg) ? 1:0]

  return negBits.concat(wholeBits,fractBits)
}

function toFloat(q, length=32, wholeLength=0) {

}

function toBinaryString(q) {
  return q.join("")
}

function toHexString(q) {
  let string = ""
  for (let i=0;i<q.length/4;i++) {
    let slice = q.slice(i*4, (i+1)*4)
    let nibble = 0
    for (let j=0;j<slice.length;j++) {
      nibble *= 2
      nibble += slice[j]
    }

    if (nibble <= 9)
      string += nibble
    else {
      switch (nibble) {
        case 10: string += 'a'; break;
        case 11: string += 'b'; break;
        case 12: string += 'c'; break;
        case 13: string += 'd'; break;
        case 14: string += 'e'; break;
        case 15: string += 'f'; break;
      }
    }
  }

  return "0x"+string
}

module.exports = {fromFloat, toFloat, toBinaryString, toHexString};