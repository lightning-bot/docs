# Command List

{% hint style="danger" %}
This list is a work-in-progress. Don't mind the dust!
{% endhint %}
{% hint style="info" %}
This guide uses `.` as a prefix. Replace this with a prefix you setup Lightning with.
{% endhint %}

## API
Commands that interact with different APIs

| Name                   | Aliases   | Description                                        | Usage                                        |
|------------------------|-----------|----------------------------------------------------|----------------------------------------------|
| blacklightning         | None      | Gives summaries for episodes of Black Lightning.   | `.blacklightning <season>`                   |
| blacklightning episode | None      | Gives info on a certain episode of Black Lightning | `.blacklightning episode <season> <episode>` |
| faq                    | None      | Searches for something in the bot's documentation  | `.faq <question>`                            |
| qr                     | None      | Generates a QR code                                | `.qr <text>`                                 |
| rtfm                   | None      | Searches PostgreSQL docs for an entity             | `.rtfm [entity]`                             |


## AutoMod
Auto-moderation commands

| Name                          | Aliases   | Description                                                                       | Usage                                                                                                                                                                                |
|-------------------------------|-----------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| automod                       | None      | Commands to configure Lightning's Auto-Moderation                                 | `.automod`                                                                                                                                                                           |
| automod gatekeeper            | None      | Manages the gatekeeper                                                            | `.automod gatekeeper`                                                                                                                                                                |
| automod ignore                | None      | Specifies what roles, members, or channels will be ignored by AutoMod by default. | `.automod ignore [entities]...`                                                                                                                                                      |
| automod ignored               | None      | Shows what roles, members, or channels are ignored by AutoMod                     | `.automod ignored`                                                                                                                                                                   |
| automod rules                 | None      |                                                                                   | `.automod rules`                                                                                                                                                                     |
| automod rules add             | None      | Adds a new rule to AutoMod.                                                       | `.automod rules add <"message-spam"\|"mass-mentions"\|"url-spam"\|"invite-spam"\|"message-content-spam"> <interval> <"delete"\|"warn"\|"mute"\|"kick"\|"ban"> [punishment_duration]` |
| automod rules addbasic        | None      | Adds a new basic rule to AutoMod                                                  | `.automod rules addbasic <"auto-dehoist"\|"auto-normalize">`                                                                                                                         |
| automod rules remove          | None      | Removes an existing AutoMod rule                                                  | `.automod rules remove <"message-spam"\|"mass-mentions"\|"url-spam"\|"invite-spam"\|"message-content-spam"\|"auto-dehoist"\|"auto-normalize">`                                       |
| automod unignore              | None      | Specify roles, members, or channels to remove from AutoMod default ignores.       | `.automod unignore [entities]...`                                                                                                                                                    |
| automod view                  | None      | Allows you to view the current AutoMod configuration                              | `.automod view`                                                                                                                                                                      |
| automod warnthreshold         | None      | Manages the threshold for warns                                                   | `.automod warnthreshold`                                                                                                                                                             |
| automod warnthreshold migrate | None      | Migrates your server's old warn punishment configuration to the new configuration | `.automod warnthreshold migrate`                                                                                                                                                     |
| automod warnthreshold remove  | None      | Removes the current warn threshold                                                | `.automod warnthreshold remove`                                                                                                                                                      |
| automod warnthreshold set     | None      | Sets a threshold for warns                                                        | `.automod warnthreshold set <limit> <"kick"\|"ban">`                                                                                                                                 |


## Configuration
Server configuration commands

| Name                                            | Aliases           | Description                                                                                     | Usage                                                                |
|-------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| config                                          | None              | Manages most of the configuration for the bot                                                   | `.config`                                                            |
| config autorole                                 | None              | Manages the server's autorole configuration                                                     | `.config autorole`                                                   |
| config mod-dms                                  | `mdms`            | Enables or disables DM messages when using a moderation command.                                | `.config mod-dms`                                                    |
| config modfooter                                | None              | Manages the footer for the messages a member will receive when actioned by a moderation command | `.config modfooter`                                                  |
| config muterole                                 | None              | Handles mute role configuration.                                                                | `.config muterole [role]`                                            |
| config muterole reset                           | `delete` `remove` | Deletes the configured mute role.                                                               | `.config muterole reset`                                             |
| config muterole unbind                          | None              | Unbinds the mute role from all users                                                            | `.config muterole unbind`                                            |
| config muterole update                          | None              | Updates the permission overwrites of the mute role.                                             | `.config muterole update`                                            |
| config permissions                              | None              | Manages user permissions for the bot                                                            | `.config permissions`                                                |
| config permissions add                          | None              | Adds a user or a role to a level                                                                | `.config permissions add <"trusted"\|"mod"\|"admin"> <_id>`          |
| config permissions blockcommand                 | None              | Blocks a command to everyone.                                                                   | `.config permissions blockcommand <command>`                         |
| config permissions commandoverrides             | None              | Manages configuration for command overrides.                                                    | `.config permissions commandoverrides`                               |
| config permissions commandoverrides add         | None              | Allows users/roles to run a command                                                             | `.config permissions commandoverrides add <command> <ids...>`        |
| config permissions commandoverrides changelevel | None              | Overrides a command's level                                                                     | `.config permissions commandoverrides changelevel <command> <level>` |
| config permissions commandoverrides removeall   | None              | Removes all overrides from a command                                                            | `.config permissions commandoverrides removeall <command>`           |
| config permissions commandoverrides reset       | None              | Removes all command overrides for this server                                                   | `.config permissions commandoverrides reset`                         |
| config permissions debug                        | None              | Debugs a member's permissions to use a command.                                                 | `.config permissions debug <command> [member=<you>]`                 |
| config permissions fallback                     | None              | Toggles the fallback permissions feature                                                        | `.config permissions fallback <boolean>`                             |
| config permissions remove                       | None              | Removes a user or a role from a level                                                           | `.config permissions remove <"trusted"\|"mod"\|"admin"> <_id>`       |
| config permissions reset                        | None              | Resets all permission configuration.                                                            | `.config permissions reset`                                          |
| config permissions show                         | None              | Shows raw permissions                                                                           | `.config permissions show`                                           |
| config permissions unblockcommand               | None              | Unblocks a command                                                                              | `.config permissions unblockcommand <command>`                       |
| config prefix                                   | None              | Manages the server's custom prefixes                                                            | `.config prefix`                                                     |


## Emoji
Emoji related commands

| Name       | Aliases   | Description                       | Usage                    |
|------------|-----------|-----------------------------------|--------------------------|
| charinfo   | None      | Shows information for a character | `.charinfo <characters>` |
| emoji      | `emote`   | Emoji management commands         | `.emoji`                 |
| emoji add  | `copy`    | Adds an emoji to the server       | `.emoji add [args...]`   |
| emoji info | None      | Gives some info on an emote.      | `.emoji info <emote>`    |


## Help


| Name   | Aliases   | Description                                        | Usage             |
|--------|-----------|----------------------------------------------------|-------------------|
| help   | None      | Shows help about the bot, a command, or a category | `.help [command]` |


## Homebrew


| Name                 | Aliases                | Description                                                           | Usage                          |
|----------------------|------------------------|-----------------------------------------------------------------------|--------------------------------|
| bmp                  | None                   | Converts a .bmp image to .png                                         | `.bmp [link=<last bmp image>]` |
| mod                  | None                   | Gets console modding information                                      | `.mod`                         |
| mod 3ds              | `3d` `3DS` `2DS` `2ds` | Gives information on 3DS modding.                                     | `.mod 3ds`                     |
| mod ds               | `dsi`                  | Gives information on DS modding                                       | `.mod ds`                      |
| mod ds flashcard     | `flashcart`            |                                                                       | `.mod ds flashcard`            |
| mod faq              | None                   | Shows a faq entry for an entity.                                      | `.mod faq <entity> <question>` |
| mod switch           | `nx`                   | Gives information on Switch modding                                   | `.mod switch`                  |
| mod wii              | None                   | Gives information on Nintendo Wii modding                             | `.mod wii`                     |
| nintendoupdatealerts | `nuf`                  | Manages the server's configuration for Nintendo console update alerts | `.nintendoupdatealerts`        |
| universaldb          | `udb`                  | Searches for homebrew on Universal-DB                                 | `.universaldb <application>`   |


## Info
Commands with information about the bot or Discord

| Name        | Aliases     | Description                                                                                 | Usage                                                  |
|-------------|-------------|---------------------------------------------------------------------------------------------|--------------------------------------------------------|
| avatar      | `avy`       | Displays a user's avatar                                                                    | `.avatar [member=<you>]`                               |
| copyright   | `license`   | Tells you about the copyright license for the bot                                           | `.copyright`                                           |
| donate      | None        | Gives you a link to my donation page                                                        | `.donate`                                              |
| join        | `invite`    | Gives you a link to add the bot to your server or generates an invite link for a client id. | `.join [ids...]`                                       |
| permissions | None        | Shows channel permissions for a member                                                      | `.permissions [member=<you>] [channel=<this channel>]` |
| prefix      | `prefixes`  | Shows prefixes the bot is listening for                                                     | `.prefix`                                              |
| quote       | None        | Quotes a message.                                                                           | `.quote <message>`                                     |
| quote raw   | `json`      | Shows raw JSON for a message.                                                               | `.quote raw <message...>`                              |
| roleinfo    | None        | Gives information for a role                                                                | `.roleinfo <role>`                                     |
| serverinfo  | `guildinfo` | Shows information about the server                                                          | `.serverinfo`                                          |
| source      | None        | Gives a link to the source code for a command.                                              | `.source [command]`                                    |
| support     | None        | Sends an invite that goes to the support server                                             | `.support`                                             |
| topic       | None        | Quotes a channel's topic                                                                    | `.topic [channel=<this channel>]`                      |
| userinfo    | `ui`        | Gives information about a member or a user                                                  | `.userinfo [member=<you>]`                             |


## Infractions
Infraction related commands

| Name                | Aliases   | Description                                                            | Usage                                        |
|---------------------|-----------|------------------------------------------------------------------------|----------------------------------------------|
| delwarn             | None      | Marks a warning as inactive.                                           | `.delwarn <member> <infraction>`             |
| infraction          | `inf`     | Commands to manage the server's infractions                            | `.infraction`                                |
| infraction claim    | None      | Claims responsibility for an infraction                                | `.infraction claim <infraction>`             |
| infraction delete   | `remove`  | Deletes an infraction                                                  | `.infraction delete <infraction>`            |
| infraction edit     | None      | Edits the reason for an infraction by its ID                           | `.infraction edit <infraction> <reason>`     |
| infraction export   | None      | Exports the server's infractions to a JSON                             | `.infraction export`                         |
| infraction list     | None      | Lists infractions that were done in the server with optional filter(s) | `.infraction list [member] [action]`         |
| infraction pardon   | None      | Pardons an infraction                                                  | `.infraction pardon <infraction_id>`         |
| infraction stats    | None      | Shows some stats about this guild's infractions                        | `.infraction stats [moderator]`              |
| infraction transfer | None      | Transfers a user's infractions to another user                         | `.infraction transfer <old_user> <new_user>` |
| infraction view     | None      | Views an infraction                                                    | `.infraction view <infraction>`              |
| mywarns             | None      | Shows your warnings in this server                                     | `.mywarns`                                   |


## ModLog
Mod logging

| Name   | Aliases   | Description                       | Usage                              |
|--------|-----------|-----------------------------------|------------------------------------|
| modlog | None      | Sets up mod logging for a channel | `.modlog [channel=<this channel>]` |


## Moderation
Moderation and server management commands.

| Name        | Aliases    | Description                                                                          | Usage                                          |
|-------------|------------|--------------------------------------------------------------------------------------|------------------------------------------------|
| ban         | None       | Bans a user from the server                                                          | `.ban [reason] [flags]`                        |
| bandel      | None       | Bans a user from the server and deletes 1 day worth of messages.                     | `.bandel <target> [reason]`                    |
| clean       | None       | Cleans the bot's messages from the channel specified.                                | `.clean [search=100] [channel=<this channel>]` |
| dehoist     | None       | Dehoists members with an optional specified character in the beginning of their name | `.dehoist [character]`                         |
| kick        | None       | Kicks a user from the server                                                         | `.kick <target> <flags>`                       |
| lock        | `lockdown` | Locks down the channel mentioned.                                                    | `.lock [channel=<this channel>]`               |
| lock thread | None       |                                                                                      | `.lock thread [thread=<this channel>]`         |
| massban     | None       | Mass bans users from the server                                                      | `.massban [members]... <reason>`               |
| mute        | None       | Permanently mutes a user                                                             | `.mute <target> <flags>`                       |
| normalize   | None       | Transliterates a member's name into ASCII                                            | `.normalize <member>`                          |
| purge       | None       | Purges messages that meet a certain criteria                                         | `.purge <search> <flags>`                      |
| timeban     | `tempban`  | Bans a user for a specified amount of time.                                          | `.timeban <target> <duration> <flags>`         |
| timemute    | `tempmute` | Mutes a user for a specified amount of time.                                         | `.timemute <target> <duration> <flags>`        |
| timeout     | None       | Timeout a member                                                                     | `.timeout <target> <duration> <flags>`         |
| unban       | None       | Unbans a user                                                                        | `.unban <member> [reason]`                     |
| unlock      | None       | Unlocks the channel mentioned.                                                       | `.unlock [channel=<this channel>]`             |
| unmute      | None       | Unmutes a user                                                                       | `.unmute <target> [reason]`                    |
| untimeout   | None       | Removes a member from time out                                                       | `.untimeout <target> [reason]`                 |
| warn        | None       | Warns a member                                                                       | `.warn <target> <flags>`                       |


## Reminders
Commands that remind you something

| Name            | Aliases    | Description                                    | Usage                          |
|-----------------|------------|------------------------------------------------|--------------------------------|
| remind          | `reminder` | Reminds you of something after a certain date. | `.remind <when>`               |
| remind clear    | None       | Clears all of your reminders                   | `.remind clear`                |
| remind delete   | `cancel`   | Deletes a reminder you own by its ID.          | `.remind delete <reminder_id>` |
| remind edit     | None       | Edits a reminder you own                       | `.remind edit <reminder_id>`   |
| remind list     | None       | Shows up to 25 of your reminders               | `.remind list`                 |
| timezone        | None       | Commands to manage your timezone in the bot    | `.timezone`                    |
| timezone get    | None       | Shows your configured timezone                 | `.timezone get`                |
| timezone remove | None       | Removes your configured timezone               | `.timezone remove`             |
| timezone set    | None       | Sets your timezone in the bot                  | `.timezone set <timezone>`     |


## Reports


| Name        | Aliases   | Description                          | Usage          |
|-------------|-----------|--------------------------------------|----------------|
| reportsetup | None      | Configure the message report feature | `.reportsetup` |


## Roles
Role based commands

| Name               | Aliases   | Description                                                  | Usage                       |
|--------------------|-----------|--------------------------------------------------------------|-----------------------------|
| rolemembers        | None      | Lists members that have a certain role                       | `.rolemembers <role>`       |
| togglerole         | None      | Toggles a role that this server has setup.                   | `.togglerole <roles...>`    |
| togglerole add     | None      | Adds a role to the list of toggleable roles for members      | `.togglerole add <role>`    |
| togglerole buttons | None      | Sets up role buttons                                         | `.togglerole buttons`       |
| togglerole delete  | `remove`  | Removes a role from the toggleable role list                 | `.togglerole delete <role>` |
| togglerole list    | None      | Lists all the self-assignable roles this server has          | `.togglerole list`          |
| togglerole purge   | None      | Deletes all the toggleable roles you have set in this server | `.togglerole purge`         |


## Stats
Statistics related commands

| Name           | Aliases       | Description                                                  | Usage                        |
|----------------|---------------|--------------------------------------------------------------|------------------------------|
| about          | None          | Gives information about the bot.                             | `.about`                     |
| ping           | None          | Tells you the ping.                                          | `.ping`                      |
| stats          | None          | Sends stats about which commands are used often in the guild | `.stats [member]`            |
| stats auditlog | `table` `log` | Shows command stats for the server through a table.          | `.stats auditlog [limit=50]` |


## Utilities
Commands that might be helpful

| Name      | Aliases   | Description                                                                        | Usage                                                                                         |
|-----------|-----------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| archive   | None      | An advanced message archive command                                                | `.archive [--limit=50] [--reverse] [--ignore-bots] [--channel] [--user] [--before] [--after]` |
| poll      | None      | Creates a simple poll with thumbs up, thumbs down, and shrug as a Discord poll.    | `.poll [hours] <question>`                                                                    |
| rpoll     | None      | Creates a simple reaction poll with thumbs up, thumbs down, and shrug as reactions | `.rpoll <question>`                                                                           |
| snowflake | None      | Tells you when a snowflake(s) was created                                          | `.snowflake [snowflakes...]`                                                                  |

