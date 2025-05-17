/*
 *  File: power-cmd.js
 *  Description: Define the power actions for the bot
 * 
 *  Copyright (c) 2025 Anthony Lee Stark. All rights reserved.
 *  Release under the MIT License
 *
 */

/*
 *  Instructions:
 *      1. To add a command: Insert an object into the under array
 *         A command object must follows this structure: 
 *          + bot_command: 'the command you want to send using your Telegram bot'
 *          + help_info: 'the help content or description of the command'
 *          + exec_func: (ctx) => { the function that will be execute when the command is triggered }
 *      2. To add a website or an application: Add an entry to the 'websites' or 'applications' object belows
 *          + 'Website': 'web-url'
 *          + 'Application-name': 'application-path'
 * 
 */

const power_actions = [
    {
        // Shutdown the computer
        bot_command: 'shutdown',
        help_info: 'Shutdown the computer\n',
        exec_command: (delay) => { 
            return `shutdown -s -f -t ${{delay}}` 
        },
        ctx_reply: (delay) => {
            if (delay > 0) {
                return `Your computer will shutdown in ${delay} second(s).`
            } else {
                return 'Your computer is shutting down.'
            }
        }
    },
    {
        // Restart the computer
        bot_command: 'restart',
        help_info: 'Restart the computer\n',
        exec_command: (delay) => { return `shutdown -r -f -t ${{delay}}` },
        ctx_reply: (delay) => {
            if (delay > 0) {
                return `Your computer will restart in ${delay} second(s).`
            } else {
                return 'Your computer is restarting.'
            }
        }
    },
    {
        // Put the computer to sleep mode
        bot_command: 'sleep',
        help_info: 'Put the computer to sleep mode\n',
        exec_command: () => {
            return 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'
        },
        ctx_reply: () => {
            return 'Your computer is going to sleep.'
        }
    },
    {
        // Put the computer to hibernation mode
        bot_command: 'hibernate',
        help_info: 'Put the computer to hibernation mode\n',
        exec_command: () => {
            return 'shutdown /h'
        },
        ctx_reply: () => {
            return 'Your computer is going to hibernate.'
        }
    },
    {
        // Lock the computer
        bot_command: 'lock',
        help_info: 'Lock the computer\n',
        exec_command: () => {
            return 'rundll32.exe user32.dll,LockWorkStation'
        },
        ctx_reply: () => {
            return 'Your computer is locked.'
        }
    },
    {
        // Log off the current user
        bot_command: 'logoff',
        help_info: 'Log off the current user\n',
        exec_command: () => {
            return 'shutdown -l'
        },
        ctx_reply: () => {
            return 'Your account is logged off.'
        }
    },
];

module.exports = { power_actions };