# Frontend test assessment

## Table of Contents

- [Library features](#features)
- [Installation](#installation)
- [API documentation](#api-documentation)
- [Examples](#examples)
- [Demos](#demos)

## Library features

- Email block will be created by pressing Enter, entering comma, or by losing focus on the input field. A Block can be deleted pressed remove button.
- Pasted emails will be converted into blocks immediately. If multiple comma-separated emails are pasted (e.g., “ivan@mail.ru, max@mail.ru”), they should be converted into multiple blocks.
- It will be possible to create several emails editors on the same page.
- No external dependencies

## Installation

Download script **emails-editor.js** from **dist** folder

### Usage

Add script on a page:

```html
<script src="emails-editor.js"></script>
```

Create instance component:

```js
var container = document.querySelector("#emails-input");
var emailsInput = EmailEditor(container, boardName);
```

## API documentation

- emailsInput.getAllEmail() return all emails
- emailsInput.getValidEmail() return all valid emails
- emailsInput.addNewEmail(email) - "email" string parametr - add emails to list
- emailsInput.replaceAllEmails(emails) - "emails" string parametr - removes all stored emails and put new emails from parametrs
- emailsInput.getEmailsCounter() - shows an alert with valid emails count.
- emailsInput.addRandomEmail() - adds a random email to the list.
- to subscribe for emails list changes

## Examples

##### Here is a simple example of emails-editor.js API

eg:

```js
emailsInput.addNewEmail("ivan@mail.ru, max@mail.ru");
```

eg:

```js
emailsInput.replaceAllEmails("ivan@mail.ru, max@mail.ru");
```

eg:

````js
    container.addEventListener("onListChange", function () {
      console.log("List Change");
    });
      ```
````

## Demos

##### There are demo hosted on [GitHub Pages](https://pages.github.com/) which demonstrate various features of:

Examples two components on a page: [https://alexafcode.github.io/emails-input/dist/index.html](https://alexafcode.github.io/emails-input/dist/index.html)
