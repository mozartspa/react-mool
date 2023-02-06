
var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Customer_possibleTypes = ['Customer']
module.exports.isCustomer = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCustomer"')
  return Customer_possibleTypes.includes(obj.__typename)
}



var Command_possibleTypes = ['Command']
module.exports.isCommand = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCommand"')
  return Command_possibleTypes.includes(obj.__typename)
}



var Review_possibleTypes = ['Review']
module.exports.isReview = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isReview"')
  return Review_possibleTypes.includes(obj.__typename)
}



var Product_possibleTypes = ['Product']
module.exports.isProduct = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isProduct"')
  return Product_possibleTypes.includes(obj.__typename)
}



var Category_possibleTypes = ['Category']
module.exports.isCategory = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCategory"')
  return Category_possibleTypes.includes(obj.__typename)
}



var ListMetadata_possibleTypes = ['ListMetadata']
module.exports.isListMetadata = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isListMetadata"')
  return ListMetadata_possibleTypes.includes(obj.__typename)
}



var Setting_possibleTypes = ['Setting']
module.exports.isSetting = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSetting"')
  return Setting_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}
