import { validEmail, getRandomEmail, removePolyfill } from "./helpers/utils";
import "./style/style.scss";

export const EmailEditor = (rootElement, boardName = "Miro Board") => {
  const emailList = [];
  const title = `Share <b>${boardName}</b> with others`;
  if (!rootElement) {
    throw new Error("Not Found Root Element");
  }
  rootElement.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="emails__input">
        <input class="emails__input-input" placeholder="add more people… " />
      </div>
  `
  );

  const emailsInput = rootElement.querySelector(".emails__input-input");

  if (!("remove" in Element.prototype)) {
    removePolyfill();
  }

  const addNewEmail = (item) => {
    if (item === "") return;
    item = item.split(/\s*,\s*/);
    item.forEach((el) => {
      el = el.toLowerCase();
      const inputContainer = rootElement.querySelector(".emails__input");
      const newEmailItem = document.createElement("div");
      const isValidEmail = validEmail(el);
      newEmailItem.className = "emails-item";
      if (!isValidEmail) {
        newEmailItem.classList.add("emails-item--invalid");
      }

      const itemsDiv = document.createElement("div");
      itemsDiv.className = "emails-item__value";
      const span = document.createElement("span");
      span.innerHTML = el;
      itemsDiv.appendChild(span);
      const btnDel = document.createElement("div");
      btnDel.className = "emails-item__delete";
      btnDel.innerHTML = "&times";
      btnDel.addEventListener("click", (e) => {
        removeEmail(e);
      });
      itemsDiv.appendChild(btnDel);
      newEmailItem.appendChild(itemsDiv);

      if (!emailList.length) {
        inputContainer.insertBefore(newEmailItem, inputContainer.firstChild);
      } else {
        inputContainer.insertBefore(
          newEmailItem,
          inputContainer.lastChild.previousSibling
        );
      }
      emailsInput.value = "";
      emailsInput.focus();
      emailList.push(el);
    });
  };

  const inputChange = (e) => {
    const { keyCode, target } = e;
    if (keyCode === 13 || keyCode === 188) {
      addNewEmail(target.value);
      e.preventDefault();
    }
  };
  const focusOver = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value !== "") {
      addNewEmail(value);
    }
  };
  const pasteEmails = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const emailsPastedData = clipboardData.getData("Text");
    addNewEmail(emailsPastedData);
  };
  const removeEmail = ({ target }) => {
    const removedEmail = target.parentNode.firstChild.textContent;
    target.parentNode.parentNode.remove();
    const newEmailList = emailList.filter((email) => email !== removedEmail);
    emailList.length = 0;
    emailList.push(...newEmailList);
    rootElement.dispatchEvent(listChangeEvent);
  };

  const listChangeEvent = document.createEvent("Event");
  listChangeEvent.initEvent("onListChange", true, true);

  const addRandomEmail = () => {
    addNewEmail(getRandomEmail());
    rootElement.dispatchEvent(listChangeEvent);
  };
  const getEmailsCounter = () => {
    const validEmailsList = emailList.filter((em) => validEmail(em));
    alert(`Valid emails ${validEmailsList.length}`);
  };

  emailsInput.addEventListener("keydown", inputChange, false);
  emailsInput.addEventListener("blur", focusOver);
  emailsInput.addEventListener("paste", pasteEmails);

  // External API
  const getAllEmail = () => emailList;
  const getValidEmail = () => emailList.filter((em) => validEmail(em));
  const replaceAllEmails = (emails) => {
    emailList.length = 0;
    rootElement
      .querySelectorAll(".emails-item")
      .forEach((e) => e.parentNode.removeChild(e));
    rootElement.dispatchEvent(listChangeEvent);
    addNewEmail(emails);
  };

  return {
    addNewEmail,
    addRandomEmail,
    getEmailsCounter,
    getAllEmail,
    getValidEmail,
    replaceAllEmails,
  };
};

window.EmailEditor = EmailEditor;
