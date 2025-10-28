# Bicycle Dealer Center

Bicycle Dealer Center — это веб-приложение для управления парком велосипедов, пользователями и процессом аренды. Оно предоставляет интуитивно понятный интерфейс для отслеживания инвентаря, регистрации клиентов и управления арендными операциями.

## Обзор приложения

|                                                   Список велосипедов                                                    |                                        Форма добавления/редактирования                                        |                                          Список пользователей                                          |
|:-----------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------:|
| ![Bicycle List Screen](https://github.com/michael204060/bicycle-dealer-center/tree/master/docs/mockups/BicycleMenu.jpg) | ![Bicycle Form Screen](https://github.com/michael204060/bicycle-dealer-center/tree/master/docs/mockups/AddingBicycle.jpg) | ![User List Screen](https://github.com/michael204060/bicycle-dealer-center/tree/master/docs/mockups/UsersMenu.jpg) |

|                                            Список аренд                                             |                                             Модальное окно аренды                                             |                                              Модальное окно возврата                                              |
|:---------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|
| ![Rentals List Screen](https://github.com/michael204060/bicycle-dealer-center/tree/master/docs/RentalsList.jpg) | ![Rent Bicycle Modal](https://github.com/michael204060/bicycle-dealer-center/tree/master/docs/mockups/RentingBicycle.jpg) | ![Return Bicycle Modal](https://github.com/michael204060/bicycle-dealer-center/tree/master/docs/mockups/ReturningBicycle.jpg) |

## 🚀 Основные возможности

*   **Управление велосипедами (CRUD):**
    *   Добавление, просмотр, редактирование и удаление велосипедов.
    *   Поиск по бренду и модели.
*   **Управление пользователями (CRUD):**
    *   Добавление, просмотр, редактирование и удаление пользователей.
*   **Система аренды:**
    *   Возможность назначать велосипед пользователю (аренда).
    *   Возможность возвращать велосипед в систему.
*   **Отчетность:**
    *   Просмотр активных и завершенных аренд в отдельном разделе.

[SRS файл программы](https://github.com/michael204060/bicycle-dealer-center/blob/master/docs/SRS.md)
## 🛠️ Технологический стек

*   **Frontend:** React, TypeScript
*   **UI-библиотека:** Material-UI (MUI)
*   **HTTP-клиент:** Axios
*   **Навигация:** React Router
*   **Стилизация:** CSS Modules / Global CSS
*   **Backend:** Java

## ⚙️ Установка и запуск

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/michael204060/bicycle-dealer-center.git
    cd bicycle-dealer-center
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    ```

3.  **Настройте API:**
    Убедитесь, что ваш бэкенд-сервер запущен и доступен по адресу `http://localhost:8080/api`. При необходимости измените `API_URL` в `src/api/bicycleApi.ts`.

4.  **Запустите приложение:**
    ```bash
    npm start
    ```
    Приложение будет доступно по адресу `http://localhost:3000`.