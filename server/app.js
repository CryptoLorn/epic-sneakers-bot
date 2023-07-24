require('dotenv').config();

const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./configs/config');

const app = express();
const bot = new TelegramBot(config.TG_TOKEN, {polling: true});

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: config.WEB_APP_URL
}));

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Welcome! Thanks, for use bot');

    const options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Show sneakers', web_app: {url: config.WEB_APP_URL}}]
            ],
        }),
    };

    await bot.sendMessage(chatId, 'Please click on the button below to view the sneakers ↓↓↓', options);
});

app.post('/orders', async (req, res) => {
    const {queryId, products, total_price, user} = req.body;

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Successfully',
            input_message_content: {
                message_text:
                    `Thanks for your order ${user?.username}!\n\nTotal amount to be paid: ${total_price}$\n\nOrders:\n${products.map(item => `${item.brand_name} ${item.model}`).join('\n')}\n\nPlease, FILL out the FORM so we can contact you ↓↓↓`
            },
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Form', web_app: {url: config.WEB_APP_URL + '/form'}}]
                ]
            }
        });
        
    } catch (e) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Failed',
            input_message_content: {message_text: `We are sorry, we could not complete the order`}
        });
    }
});

app.post('/form', async (req, res) => {
    const {name, phone, city, queryId} = req.body;

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Successfully',
            input_message_content: {
                message_text:
                    `Thanks, your data:\nName: ${name}\nPhone: ${phone}\nCity: ${city}\n\nWait, you will be contacted!`
            }
        });
    } catch (e) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Failed',
            input_message_content: {message_text: `We are sorry, we could not complete fill form`}
        });
    }
});

app.listen(config.PORT, () => console.log(`Server start on port ${config.PORT}`));