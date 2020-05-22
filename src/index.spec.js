import { EmailEditor } from "./index";
jest.mock("./style/style.scss", () => jest.fn());

describe("Testing EmailEditor", () => {
  it("addNewEmail() works", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);
    expect(emailComponent.getAllEmail()).toEqual([]);

    emailComponent.addNewEmail("alex@mail.ru, max@gmail.com");
    expect(emailComponent.getAllEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
    ]);

    emailComponent.addNewEmail("");
    expect(emailComponent.getAllEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
    ]);

    emailComponent.addNewEmail("google@gmail.com");
    expect(emailComponent.getAllEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
      "google@gmail.com",
    ]);
  });

  it("addRandomEmail() works", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);
    emailComponent.addRandomEmail();
    expect(emailComponent.getAllEmail()).not.toEqual([]);
  });

  it("replaceAllEmails() works", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);
    emailComponent.addNewEmail("alex@mail.ru, max@gmail.com");

    const emailForReplace = "ael@mail.ru, as@ldfk.ru";
    emailComponent.replaceAllEmails(emailForReplace);
    expect(emailComponent.getAllEmail()).toEqual(["ael@mail.ru", "as@ldfk.ru"]);
  });

  it("getValidEmail() works", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);
    emailComponent.addNewEmail("alex@mail.ru, max@gmail.com, a!.e");

    expect(emailComponent.getValidEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
    ]);
  });
});

describe("Testing actions", () => {
  it("Click On Delete", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);

    emailComponent.addNewEmail("alex@mail.ru,  max@gmail.com");
    expect(emailComponent.getAllEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
    ]);

    rootContainer.querySelector(".emails-item__delete").click();
    expect(emailComponent.getAllEmail()).toEqual(["max@gmail.com"]);
  });

  it("Click on Enter with value", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);
    const input = rootContainer.querySelector(".emails__input-input");

    input.value = "alex@mail.ru";
    var keyboardEvent = new KeyboardEvent("keydown", {
      code: "Enter",
      key: "Enter",
      charKode: 13,
      keyCode: 13,
      view: window,
    });
    input.dispatchEvent(keyboardEvent);

    input.value = "max@gmail.com";
    input.dispatchEvent(keyboardEvent);
    expect(emailComponent.getAllEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
    ]);
  });

  it("Click on Comma with value", () => {
    const rootContainer = document.createElement("div");
    const emailComponent = EmailEditor(rootContainer);
    const input = rootContainer.querySelector(".emails__input-input");

    input.value = "alex@mail.ru";
    var keyboardEvent = new KeyboardEvent("keydown", {
      code: "comma",
      key: "comma",
      charKode: 188,
      keyCode: 188,
      view: window,
    });
    input.dispatchEvent(keyboardEvent);

    input.value = "max@gmail.com";
    input.dispatchEvent(keyboardEvent);
    expect(emailComponent.getAllEmail()).toEqual([
      "alex@mail.ru",
      "max@gmail.com",
    ]);
  });
});
