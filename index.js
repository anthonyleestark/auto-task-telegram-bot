/*  
 *  File: index.js
 *  Description: Telegram Bot for auto-task (entry point)
 * 
 *  Based on J2TEAM/telegram-bot-shutdown
 *  Copyright (c) 2025 Anthony Lee Stark. All rights reserved.
 *  Release under the MIT License
 * 
 */

const { basic_commands } = require('./utils/basic-cmd')
const { power_actions } = require('./utils/power-cmd')

const { Telegraf } = require('telegraf')
const { exec } = require('child_process');
const { type } = require('os');

/*-----------------------------------------------------------------------------
 *
 *  1. Create a new bot using [BotFather](https://t.me/BotFather) on Telegram
 *  2. Copy the returned token and paste it in here
 */
const BOT_TOKEN = 'ENTER_YOUR_BOT_TOKEN_HERE'
/*----------------------------------------------------------------------------*/

// Bot initialization
const bot = new Telegraf(BOT_TOKEN)
bot.start((ctx) =>
    ctx.reply('Welcome to the Auto Task Bot!'))

// Set up basic commands
for (const cmd of basic_commands) {
    bot.command(cmd.bot_command, (ctx) => {
        // Execute the command
        cmd.exec_func(ctx);
    })
}

// Setup power action commands
for (const action of power_actions) {
    bot.command(action.bot_command, (ctx) => {

        // Execute the command
        exec(action.exec_command(pwr_delay_time), (error) => {
            if (error) {
                console.error(`Error: ${error}`);
                return;
            }
        });

        // Reply to the user
        ctx.reply(action.ctx_reply(pwr_delay_time))
    })
}

// Allow changing Power action delay time
// Note: This value will not be stored, it will be reset if you restart the bot
let pwr_delay_time = 0;   // default: 0 second -> immediately
bot.command('pwrdelay', (ctx) => {
    const value = ctx.message.text.split(' ').slice(1).join(' ')
    const time = Number(value);
    if (!isNaN(time) && time >= 0) {
        pwr_delay_time = time
        if (time > 0) {
            ctx.reply(`Power action delay time is set to ${pwr_delay_time} second(s).`)
        } else {
            ctx.reply('Power action delay time is reset to default.')
        }
    } else {
        ctx.reply('Invalid value')
    }
})

// Help info
bot.command('help', (ctx) => {
    let help_content = 'Available commands:\n';

    // Make list of available command descriptions
    for (const cmd of basic_commands) {
        help_content += `\n/${cmd.bot_command}:\n${cmd.help_info}`
    }
    for (const action of power_actions) {
        help_content += `\n/${action.bot_command}:\n${action.help_info}`
    }
    help_content += '\n/pwrdelay:\nSet the delay time for power actions (shutdown/restart), default is 0.\nEx: /pwrdelay 30'

    // Print help content
    ctx.reply(help_content);
})

// Launch the bot
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// Notification
console.log('Auto-task Telegram bot started')
