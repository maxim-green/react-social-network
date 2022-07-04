## Как я работал над этим проектом
Целью проекта было применение на практике изучаемых мной frontend-технологий. 

- За основу был взят макет социальной сети с сайта themeforest. В процессе разработки дизайн был изменен. [Скриншот макета](https://drive.google.com/file/d/18t07vu9RcgJ8SUGTphj8zlpk8zdGZ0Lm/view?usp=sharing)
- Задачи ставились на kanban-доске в приложении Todoist. В будущих проектах планирую использовать Jira. [Cкриншот доски](https://drive.google.com/file/d/1vxWrEZhqGQmFhWzr3AxVzvQiAf4mwsBO/view?usp=sharing)
- Чтобы приложение было полноценным в проект был также добавлен REST API на Express. Несмотря на это основное внимание я уделял frontend-части.

## На что обратить внимание
- Взаимодействие с Backend частью приложения посредством REST API. Для обновления JWT-токенов используются axios-interceptors. [Пример](https://github.com/maxim-green/react-social-network/blob/main/client/src/api/auth.api.ts) 
- Адаптивная вёрстка с помощью SCSS модулей. [Пример](https://github.com/maxim-green/react-social-network/blob/main/client/src/components/Layout/Layout.module.scss)
- Использование Redux для управления состоянием приложения и Redux-Thunk для выполнения запросов к API. [Пример](https://github.com/maxim-green/react-social-network/blob/main/client/src/store/reducers/posts.reducer.ts)
- Кастомный хук, который позволяет рендерить компоненты в зависимости от ширины экрана устройства. [useBreakpoint](https://github.com/maxim-green/react-social-network/blob/main/client/src/hooks/useBreakpoint.ts)
- Деплой приложения на VPS-сервер при пуше в main ветку с помощью GitHub Actions. [](https://github.com/maxim-green/react-social-network/blob/main/.github/workflows/deploy.yml)

## Что бы я изменил в приложении
- Сделал бы рефакторинг некоторых компонентов. Например [Form](https://github.com/maxim-green/react-social-network/blob/main/client/src/components/_shared/Form/Form.tsx)
- Покрыл бы приложение Unit-тестами.
