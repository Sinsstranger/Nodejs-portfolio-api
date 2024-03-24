# Course project &laquo;API для сайта портфолио&raquo;

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

В данном проекте был реализован API на NodeJs c фреймворком Express. В реализации использовался паттерн MVC.

![Screenshot 1](./Portfolio_API_NodeJS_Screenshot_1.png)

## Настройка перед работой

- Перед работой необходимо установить зависимости командой `npm install`
- Для запуска потребуются переменные окружения, которые устанавливаются в файле `.env` пример настройки приведен в файле `.env.example`
- Необходимо для переменной окружения `MONGODB_CONNECTION` установить значение вида `mongodb+srv://<логин>:<пароль>@<хост_базы_данных>/<имя_базы_данных>?retryWrites=true&w=majority`

##### Запуск проекта в режиме разработки`npm run dev`

##### Запуск проекта в production режиме `npm run start`

В приложении реализована авторизация через библиотеку [Passport.js](https://www.passportjs.org/)
по двум стратегиям логин/пароль и JWT токен
