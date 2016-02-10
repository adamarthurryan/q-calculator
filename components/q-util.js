/** methods for displaying and manipulating q-numbers */

let compliment = bits => bits.map(b=>1-b)

function fromIntBits(int, fractLength=31, wholeLength=0) {
  let length = fractLength+wholeLength+1
  let bits = Array(length).fill(0)

  for (let i=length-1; i>=0; i--) {
    bits[i]=int%2
    int -= bits[i]
    int /= 2
  }

  if (int > 0)
    throw new Error(`overflow bits: ${int} did not fit in ${length} bits`)

  return bits
}

function fromHexString(str, fractLength=31, wholeLength=0) {
  let length = fractLength+wholeLength+1
  let bits = Array(length).fill(0)

  let matchRes = str.match(/0x([0-9a-fA-F]+)/)

  if (matchRes == null || matchRes.length!=2)
    throw new Error(`invalid hex string: ${str}`)

  //

/* ...
  for (let i=length-1; i>=0; i--) {
    bits[i]=int%2
    int -= bits[i]
    int /= 2
  }

  if (int > 0)
    throw new Error(`overflow bits: ${int} did not fit in ${length} bits`)
*/
  return bits
}



function fromFloat(float, fractLength=31, wholeLength=0) {

  let isNeg = float < 0

  let wholePart = Math.floor(Math.abs(float))
  let fractPart = Math.abs(float)-wholePart

  let wholeBits = []
  let wholePartRem = wholePart
  for (let i=0;i<wholeLength;i++) {
    let bit = wholePartRem % 2
    wholeBits.unshift(bit)
    wholePartRem = (wholePartRem-bit) /2
  }

  if (wholePartRem>0)
    throw new Error(`overflow whole bits: ${float} did not fit in ${wholeLength} bits`)

  let fractBits = []
  let fractPartRem = fractPart
  for (let i=0;i<fractLength;i++) {
    let bit = (fractPartRem >= 0.5) ? 1 : 0
    if (bit==1) 
      fractPartRem -= 0.5
    fractPartRem *= 2
    fractBits.push(bit)
  }

  if (isNeg) {
    wholeBits = compliment(wholeBits)
    fractBits = compliment(fractBits)
  }
  
  let negBits = [(isNeg) ? 1:0]

  return negBits.concat(wholeBits,fractBits)
}

function toFloat(q, fractLength=31, wholeLength=0) {
  let isNeg = q[0]==1;
  let wholeBits = q.slice(1, wholeLength+1)
  let fractBits = q.slice(1+wholeLength, fractLength+wholeLength+1)

  if (isNeg) {
    wholeBits = compliment(wholeBits)
    fractBits = compliment(fractBits)
  }

  let wholePart = 0
  for (let i=0;i<wholeBits.length;i++) {
    wholePart *= 2
    wholePart += wholeBits[i]
  }

  let fractPart = 0
  for (let i=fractBits.length-1;i>=0;i--) {
    fractPart /= 2
    fractPart += fractBits[i]/2;
  }

  return (isNeg ? -1 : 1) * (wholePart+fractPart)
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

module.exports = {fromFloat, fromHexString,toFloat, toBinaryString, toHexString};