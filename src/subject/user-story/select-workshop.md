# Выбрать мастерскую
## История
Я как зарегестрированный пользователь хочу выбрать мастерскую, чтобы дальше пользоваться сервисом данной мастерской.

## Действия
1. Нахожу в telegram бота `@soul_workshop_bot`
2. Набираю команду `/start`
3. Выбираю кнопку "Выбрать мастерскую"
4. Из списка нажимаю кнопку с той мастерской которая мне нужна
5. Нажимаю кнопку "Сделать текущим"

## Доменные условия
- пользователь должен быть зарегистрирован как клиент

## Результат
**Система:**
- У пользователя изменился "Текущая мастерская";

**Пользователь:**
- Получает сообщение: "Вы успешно поменяли текущую мастерскую. Теперь все взаимодействия через сервис будет связано с данной мастерской.";

## Альтернативные сценарии
1.1 Сотрудник мастерской пользуется ботом `@soul_workshop_service_bot`;  
2.1 Шаги 2, 3 можно выполнить за раз набрав команду `/select_workshop`;  
3.1 Начиная с шага 3 могу отменить выбор мастерской нажав на кнопку "Отменить";  
4.1 Для ремесленника: могу нажать кнопку "Изменить город";  
- Из списка выбираю город и продолжаю с шага 4;

4.2 Могу нажать кнопку "Далее...", если все мастерские города не поместились в один список;  
5.1 Могу нажать кнопку "Детали", чтобы посмотреть подробную информацию о мастерской;
- На сообщении с деталями мастерской нажимаю кнопку "Вернуться", чтобы попасть на шаг 5;