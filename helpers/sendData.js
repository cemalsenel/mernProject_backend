/**
  * Returns json data or string value
  * @param {(object)} res - Response object
  * @param {(json|string)} data - The data that will be sent  
  * @param {(number)} code - Status code. Default valuse is 200 
*/

const sendData = (res, data, code = 200) => {
  data == String ?
      res.status(code).send(data)
      :
      res.status(code).json(data);
}

module.exports = sendData;