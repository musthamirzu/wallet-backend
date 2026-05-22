const generateReference = () => {

  return `TXN-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;
};

module.exports = generateReference;