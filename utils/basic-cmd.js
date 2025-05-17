/*
 *  File: basic-cmd.js
 *  Description: Define the basic commands for the bot
 * 
 *  Copyright (c) 2025 Anthony Lee Stark. All rights reserved.
 *  Release under the MIT License
 *
 */

const { exec } = require('child_process');

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

const basic_commands = [
    {
        // Execute a command with Command Prompt
        // Example: /cmd ipconfig
        bot_command: 'cmd',
        help_info: 'Execute a command with Command Prompt\nEx: /cmd ipconfig\n',
        exec_func: (ctx) => {
            const command = ctx.message.text.split(' ').slice(1).join(' ')
            if (command) {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error}`);
                        return;
                    }
                    ctx.reply(stdout || stderr);
                });
            } else {
                ctx.reply('Invalid command.');
            }
        }
    },
    {
        // Execute a command with PowerShell
        // Example: /ps Get-Process -Name chrome
        bot_command: 'ps',
        help_info: 'Execute a command with PowerShell\nEx: /ps Get-Process -Name chrome\n',
        exec_func: (ctx) => {
            const command = ctx.message.text.split(' ').slice(1).join(' ')
            if (command) {
                exec(`powershell.exe -Command "${command}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error}`);
                        return;
                    }
                    ctx.reply(stdout || stderr);
                });
            } else {
                ctx.reply('Invalid command.');
            }
        }
    },
    {
        // Open a website or application
        // Example: /open google
        bot_command: 'open',
        help_info: 'Open a website or application\nEx: /open google\n      /open notepad\n',
        exec_func: (ctx) => {
            const target = ctx.message.text.split(' ').slice(1).join(' ')
            for (const [name, url] of Object.entries(websites)) {
                if (target.toLowerCase() === name.toLowerCase()) {
                    exec(`start ${url}`, (error) => {
                        if (error) {
                            console.error(`Error: ${error}`);
                            return;
                        }
                    });
                    ctx.reply(`Opening ${name}...`);
                    return;
                }
            }
            for (const [name, app] of Object.entries(applications)) {
                if (target.toLowerCase() === name.toLowerCase()) {
                    exec(`start ${app}`, (error) => {
                        if (error) {
                            console.error(`Error: ${error}`);
                            return;
                        }
                    });
                    ctx.reply(`Opening ${name}...`);
                    return;
                }
            }
        }
    },
    {
        // Print the list of available websites
        bot_command: 'weblist',
        help_info: 'Print the list of available websites\n',
        exec_func: (ctx) => {
            let reply = 'Available websites:\n';
            for (const [name, url] of Object.entries(websites)) {
                reply += `- ${name} (${url})\n`;
            }
            ctx.reply(reply);
        }
    },
    {
        // Print the list of available applications
        bot_command: 'applist',
        help_info: 'Print the list of available applications\n',
        exec_func: (ctx) => {
            let reply = 'Available applications:\n';
            for (const [name, path] of Object.entries(applications)) {
                reply += `- ${name} (${path})\n`;
            }
            ctx.reply(reply);
        }
    }
];

module.exports = { basic_commands };

/*
 * List of websites to open
 * You can add more websites to this list
 */
const websites = {
    'Google': 'https://www.google.com',
    'YouTube': 'https://www.youtube.com',
    'Facebook': 'https://www.facebook.com',
    'Twitter': 'https://www.twitter.com',
    'Instagram': 'https://www.instagram.com',
    'LinkedIn': 'https://www.linkedin.com',
    'Reddit': 'https://www.reddit.com',
    'Wikipedia': 'https://www.wikipedia.org',
    'ChatGPT': 'https://www.openai.com/chatgpt',
    'Amazon': 'https://www.amazon.com',
    'eBay': 'https://www.ebay.com',
    'Netflix': 'https://www.netflix.com',
    'Spotify': 'https://www.spotify.com',
    'Discord': 'https://www.discord.com',
    'Twitch': 'https://www.twitch.tv',
    'GitHub': 'https://www.github.com',
    'Stack Overflow': 'https://stackoverflow.com',
    'Quora': 'https://www.quora.com',
    'Pinterest': 'https://www.pinterest.com',
    'SoundCloud': 'https://www.soundcloud.com',
    'DeviantArt': 'https://www.deviantart.com',
};

/*
 * List of applications to open
 * You can add more applications to this list
 */
const applications = {
    'Explorer': 'explorer.exe',
    'Control Panel': 'control.exe',
    'Settings': 'ms-settings:',
    'Notepad': 'notepad.exe',
    'Calculator': 'calc.exe',
    'Paint': 'mspaint.exe',
    'WordPad': 'write.exe',
    'Chrome': 'chrome.exe',
    'Firefox': 'firefox.exe',
    'Edge': 'msedge.exe',
    'Word': 'winword.exe',
    'Excel': 'excel.exe',
    'PowerPoint': 'powerpnt.exe',
    'Outlook': 'outlook.exe',
    'Visual Studio': 'devenv.exe',
    'VS Code': 'Code.exe',
    'Notepad++': 'notepad++.exe',
    'VLC': 'vlc.exe',
    'Teams': 'Teams.exe',
    'Task Manager': 'taskmgr.exe',
    'CMD': 'cmd.exe',
    'Command Prompt': 'cmd.exe',
    'PowerShell': 'powershell.exe',
    'Registry Editor': 'regedit.exe',
    'Device Manager': 'devmgmt.msc',
    'Disk Management': 'diskmgmt.msc',
    'Task Scheduler': 'taskschd.msc',
    'Event Viewer': 'eventvwr.msc',
    'Photoshop': 'Photoshop.exe',
    'Illustrator': 'Illustrator.exe',
    'After Effects': 'AfterFX.exe',
    'Lightroom': 'Lightroom.exe',
};
