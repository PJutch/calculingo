# Calculingo
Геймификация ботания матана, по сути примитивный Дуолинго с интегралам

## Требования
- Node.js (тестил на 20 и 25)
- supabase
- Docker (чтобы поднять supabase локально)

## Запуск локально
- `git clone https://github.com/PJutch/calculingo; cd ./calculingo`
- `npm install`
- `npx supabase start`
- Создайте .env файл
```
VITE_SUPABASE_ANON_KEY="публичный ключ, который вы получили"
VITE_SUPABASE_URL="ссылку, которую вы получили"
VITE_BASE_URL="/"
```
- `npm run dev`
- Прочитайте, где поднялось, скорее всего http://localhost:5173/
