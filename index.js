const TelegramApi = require("node-telegram-bot-api")

const api = '5517831681:AAHnHlWitL5tN-3rWOqJHeEBIGuZhnu-th8';

const bot = new TelegramApi(api, { polling: true });

const chats = {};
bot.setMyCommands([
    { command: '/start', description: 'Boshlash' },
    { command: '/info', description: "Siz haqingizda ma'lumot" },
    { command: '/game', description: "Play game" }
])
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }, { text: '3', callback_data: '3' }],
            [{ text: '4', callback_data: '4' }, { text: '5', callback_data: '5' }, { text: '6', callback_data: '6' }],
            [{ text: '7', callback_data: '7' }, { text: '8', callback_data: '8' }, { text: '9', callback_data: '9' }],
            [{ text: '0', callback_data: '0' }]
        ]
    })
}
const againOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Boshqatdan boshlash', callback_data: '/again' }]
        ]
    })
}
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Mendan aqllimisiz,qani sinab ko'ramiz.Men 0 dan 9 gacha  son o'yladim va buni siz toping");
    const randomNumber = Math.floor(10 * Math.random());
    chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, "Sonni toping", gameOptions)
}
const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === "/start") {
            return bot.sendMessage(chatId, "Assalomu aleykum, botga xush kelibsiz😊")
            return bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp')
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, "Sizning ismingiz " + `${msg.from.first_name}`)
        }
        if (text === "/game") {
            return startGame(chatId);
        }
        else bot.sendMessage(chatId, "No'to'g'ri buyruq")
    })
    bot.on("callback_query", msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        else if (data === chats[chatId]) {
            bot.sendMessage(chatId, `Tabriklayman, siz ${chats[chatId]} sonini topdingiz`)
        }
        else{
            bot.sendMessage(chatId, `Afsus siz sonni topolmadingiz😔😔😔 , bu son ${chats[chatId]} edi`, againOption);
        }
    })
}
start()