/**
 * Checks whether there is error or not
 *@param {(object)} res - Response Object  
 *@param {(boolean)} variable - Control Variable  
 *@param {(string|string[])} message - Error message/messages  
 *@param {(Number)} code - Status Code. Default value = 400. 
 *@returns {(json)} Error
*/

const checkFunction = (res, variable, message, code = 400) => {
  if (variable) {
      if (typeof message == String)
          return res.status(code).json({ errors: [{ message }] });
      else {
          return res.status(code).json({ errors: message });
      }
  }
}

module.exports = checkFunction;