const emailValidator = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
const domains = ["@mail.ru", "@gmail.com"];

export const validEmail = (email) => {
  return emailValidator.test(String(email).toLowerCase());
};

export const getRandomEmail = () => {
  let loginName = "";
  const domain = Math.floor(Math.random() * domains.length);
  const emailLength = Math.floor(Math.random() * 8) + 2;
  for (let i = 0; i < emailLength; i++) {
    loginName += chars.charAt(Math.round(chars.length * Math.random()));
  }
  return `${loginName}${domains[domain]}`;
};

export const removePolyfill = () => {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
};
