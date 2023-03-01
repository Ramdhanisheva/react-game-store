function getPrice(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    let charCode = name.charCodeAt(i);
    sum += charCode * (i + 1);
  }
  let hashValue = sum % 1000;
  let price = 10 + (hashValue / 1000) * 60;
  return price.toFixed(2);
}

export default getPrice;
