# Command List

{% hint style="danger" %}
This list is a work-in-progress. Don't mind the dust!
{% endhint %}

{% hint style="info" %}
This guide uses `.` as a prefix. Replace this with a prefix you setup Lightning with.
{% endhint %}

## API

Commands that interact with different APIs

<table><thead><tr><th>Name</th><th width="111">Aliases</th><th>Description</th><th>Usage</th></tr></thead><tbody><tr><td>blacklightning</td><td>None</td><td>Gives summaries for episodes of Black Lightning.</td><td><code>.blacklightning &#x3C;season></code></td></tr><tr><td>blacklightning episode</td><td>None</td><td>Gives info on a certain episode of Black Lightning</td><td><code>.blacklightning episode &#x3C;season> &#x3C;episode></code></td></tr><tr><td>faq</td><td>None</td><td>Searches for something in the bot's documentation</td><td><code>.faq &#x3C;question></code></td></tr><tr><td>qr</td><td>None</td><td>Generates a QR code</td><td><code>.qr &#x3C;text></code></td></tr><tr><td>rtfm</td><td>None</td><td>Searches PostgreSQL docs for an entity</td><td><code>.rtfm [entity]</code></td></tr></tbody></table>

## AutoMod

Auto-moderation commands

<table><thead><tr><th>Name</th><th width="105">Aliases</th><th>Description</th><th>Usage</th></tr></thead><tbody><tr><td>automod</td><td>None</td><td>Commands to configure Lightning's Auto-Moderation</td><td><code>.automod</code></td></tr><tr><td>automod gatekeeper</td><td>None</td><td>Manages the gatekeeper</td><td><code>.automod gatekeeper</code></td></tr><tr><td>automod ignore</td><td>None</td><td>Specifies what roles, members, or channels will be ignored by AutoMod by default.</td><td><code>.automod ignore [entities]...</code></td></tr><tr><td>automod ignored</td><td>None</td><td>Shows what roles, members, or channels are ignored by AutoMod</td><td><code>.automod ignored</code></td></tr><tr><td>automod rules</td><td>None</td><td></td><td><code>.automod rules</code></td></tr><tr><td>automod rules add</td><td>None</td><td>Adds a new rule to AutoMod.</td><td><code>.automod rules add &#x3C;"message-spam"|"mass-mentions"|"url-spam"|"invite-spam"|"message-content-spam"> &#x3C;interval> &#x3C;"delete"|"warn"|"mute"|"kick"|"ban"> [punishment_duration]</code></td></tr><tr><td>automod rules addbasic</td><td>None</td><td>Adds a new basic rule to AutoMod</td><td><code>.automod rules addbasic &#x3C;"auto-dehoist"|"auto-normalize"></code></td></tr><tr><td>automod rules remove</td><td>None</td><td>Removes an existing AutoMod rule</td><td><code>.automod rules remove &#x3C;"message-spam"|"mass-mentions"|"url-spam"|"invite-spam"|"message-content-spam"|"auto-dehoist"|"auto-normalize"></code></td></tr><tr><td>automod unignore</td><td>None</td><td>Specify roles, members, or channels to remove from AutoMod default ignores.</td><td><code>.automod unignore [entities]...</code></td></tr><tr><td>automod view</td><td>None</td><td>Allows you to view the current AutoMod configuration</td><td><code>.automod view</code></td></tr><tr><td>automod warnthreshold</td><td>None</td><td>Manages the threshold for warns</td><td><code>.automod warnthreshold</code></td></tr><tr><td>automod warnthreshold migrate</td><td>None</td><td>Migrates your server's old warn punishment configuration to the new configuration</td><td><code>.automod warnthreshold migrate</code></td></tr><tr><td>automod warnthreshold remove</td><td>None</td><td>Removes the current warn threshold</td><td><code>.automod warnthreshold remove</code></td></tr><tr><td>automod warnthreshold set</td><td>None</td><td>Sets a threshold for warns</td><td><code>.automod warnthreshold set &#x3C;limit> &#x3C;"kick"|"ban"></code></td></tr></tbody></table>

## Configuration

Server configuration commands

<table><thead><tr><th>Name</th><th width="107">Aliases</th><th>Description</th><th>Usage</th></tr></thead><tbody><tr><td>config</td><td>None</td><td>Manages most of the configuration for the bot</td><td><code>.config</code></td></tr><tr><td>config autorole</td><td>None</td><td>Manages the server's autorole configuration</td><td><code>.config autorole</code></td></tr><tr><td>config mod-dms</td><td><code>mdms</code></td><td>Enables or disables DM messages when using a moderation command.</td><td><code>.config mod-dms</code></td></tr><tr><td>config modfooter</td><td>None</td><td>Manages the footer for the messages a member will receive when actioned by a moderation command</td><td><code>.config modfooter</code></td></tr><tr><td>config muterole</td><td>None</td><td>Handles mute role configuration.</td><td><code>.config muterole [role]</code></td></tr><tr><td>config muterole reset</td><td><code>delete</code> <code>remove</code></td><td>Deletes the configured mute role.</td><td><code>.config muterole reset</code></td></tr><tr><td>config muterole unbind</td><td>None</td><td>Unbinds the mute role from all users</td><td><code>.config muterole unbind</code></td></tr><tr><td>config muterole update</td><td>None</td><td>Updates the permission overwrites of the mute role.</td><td><code>.config muterole update</code></td></tr><tr><td>config permissions</td><td>None</td><td>Manages user permissions for the bot</td><td><code>.config permissions</code></td></tr><tr><td>config permissions add</td><td>None</td><td>Adds a user or a role to a level</td><td><code>.config permissions add &#x3C;"trusted"|"mod"|"admin"> &#x3C;_id></code></td></tr><tr><td>config permissions blockcommand</td><td>None</td><td>Blocks a command to everyone.</td><td><code>.config permissions blockcommand &#x3C;command></code></td></tr><tr><td>config permissions commandoverrides</td><td>None</td><td>Manages configuration for command overrides.</td><td><code>.config permissions commandoverrides</code></td></tr><tr><td>config permissions commandoverrides add</td><td>None</td><td>Allows users/roles to run a command</td><td><code>.config permissions commandoverrides add &#x3C;command> &#x3C;ids...></code></td></tr><tr><td>config permissions commandoverrides changelevel</td><td>None</td><td>Overrides a command's level</td><td><code>.config permissions commandoverrides changelevel &#x3C;command> &#x3C;level></code></td></tr><tr><td>config permissions commandoverrides removeall</td><td>None</td><td>Removes all overrides from a command</td><td><code>.config permissions commandoverrides removeall &#x3C;command></code></td></tr><tr><td>config permissions commandoverrides reset</td><td>None</td><td>Removes all command overrides for this server</td><td><code>.config permissions commandoverrides reset</code></td></tr><tr><td>config permissions debug</td><td>None</td><td>Debugs a member's permissions to use a command.</td><td><code>.config permissions debug &#x3C;command> [member=&#x3C;you>]</code></td></tr><tr><td>config permissions fallback</td><td>None</td><td>Toggles the fallback permissions feature</td><td><code>.config permissions fallback &#x3C;boolean></code></td></tr><tr><td>config permissions remove</td><td>None</td><td>Removes a user or a role from a level</td><td><code>.config permissions remove &#x3C;"trusted"|"mod"|"admin"> &#x3C;_id></code></td></tr><tr><td>config permissions reset</td><td>None</td><td>Resets all permission configuration.</td><td><code>.config permissions reset</code></td></tr><tr><td>config permissions show</td><td>None</td><td>Shows raw permissions</td><td><code>.config permissions show</code></td></tr><tr><td>config permissions unblockcommand</td><td>None</td><td>Unblocks a command</td><td><code>.config permissions unblockcommand &#x3C;command></code></td></tr><tr><td>config prefix</td><td>None</td><td>Manages the server's custom prefixes</td><td><code>.config prefix</code></td></tr></tbody></table>

## Emoji

Emoji related commands

<table><thead><tr><th>Name</th><th width="109">Aliases</th><th>Description</th><th>Usage</th></tr></thead><tbody><tr><td>charinfo</td><td>None</td><td>Shows information for a character</td><td><code>.charinfo &#x3C;characters></code></td></tr><tr><td>emoji</td><td><code>emote</code></td><td>Emoji management commands</td><td><code>.emoji</code></td></tr><tr><td>emoji add</td><td><code>copy</code></td><td>Adds an emoji to the server</td><td><code>.emoji add [args...]</code></td></tr><tr><td>emoji info</td><td>None</td><td>Gives some info on an emote.</td><td><code>.emoji info &#x3C;emote></code></td></tr></tbody></table>

## Help

<table><thead><tr><th>Name</th><th width="111">Aliases</th><th>Description</th><th>Usage</th></tr></thead><tbody><tr><td>help</td><td>None</td><td>Shows help about the bot, a command, or a category</td><td><code>.help [command]</code></td></tr></tbody></table>

## Homebrew

<table><thead><tr><th width="208">Name</th><th width="139">Aliases</th><th>Description</th><th>Usage</th></tr></thead><tbody><tr><td>bmp</td><td>None</td><td>Converts a .bmp image to .png</td><td><code>.bmp [link=&#x3C;last bmp image>]</code></td></tr><tr><td>mod</td><td>None</td><td>Gets console modding information</td><td><code>.mod</code></td></tr><tr><td>mod 3ds</td><td><code>3d</code> <code>3DS</code> <code>2DS</code> <code>2ds</code></td><td>Gives information on 3DS modding.</td><td><code>.mod 3ds</code></td></tr><tr><td>mod ds</td><td><code>dsi</code></td><td>Gives information on DS modding</td><td><code>.mod ds</code></td></tr><tr><td>mod ds flashcard</td><td><code>flashcart</code></td><td></td><td><code>.mod ds flashcard</code></td></tr><tr><td>mod faq</td><td>None</td><td>Shows a faq entry for an entity.</td><td><code>.mod faq &#x3C;entity> &#x3C;question></code></td></tr><tr><td>mod switch</td><td><code>nx</code></td><td>Gives information on Switch modding</td><td><code>.mod switch</code></td></tr><tr><td>mod wii</td><td>None</td><td>Gives information on Nintendo Wii modding</td><td><code>.mod wii</code></td></tr><tr><td>nintendoupdatealerts</td><td><code>nuf</code></td><td>Manages the server's configuration for Nintendo console update alerts</td><td><code>.nintendoupdatealerts</code></td></tr><tr><td>universaldb</td><td><code>udb</code></td><td>Searches for homebrew on Universal-DB</td><td><code>.universaldb &#x3C;application></code></td></tr></tbody></table>

## Info

Commands with information about the bot or Discord

| Name        | Aliases     | Description                                                                                 | Usage                                                  |
| ----------- | ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
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

| Name                | Aliases  | Description                                                            | Usage                                        |
| ------------------- | -------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| delwarn             | None     | Marks a warning as inactive.                                           | `.delwarn <member> <infraction>`             |
| infraction          | `inf`    | Commands to manage the server's infractions                            | `.infraction`                                |
| infraction claim    | None     | Claims responsibility for an infraction                                | `.infraction claim <infraction>`             |
| infraction delete   | `remove` | Deletes an infraction                                                  | `.infraction delete <infraction>`            |
| infraction edit     | None     | Edits the reason for an infraction by its ID                           | `.infraction edit <infraction> <reason>`     |
| infraction export   | None     | Exports the server's infractions to a JSON                             | `.infraction export`                         |
| infraction list     | None     | Lists infractions that were done in the server with optional filter(s) | `.infraction list [member] [action]`         |
| infraction pardon   | None     | Pardons an infraction                                                  | `.infraction pardon <infraction_id>`         |
| infraction stats    | None     | Shows some stats about this guild's infractions                        | `.infraction stats [moderator]`              |
| infraction transfer | None     | Transfers a user's infractions to another user                         | `.infraction transfer <old_user> <new_user>` |
| infraction view     | None     | Views an infraction                                                    | `.infraction view <infraction>`              |
| mywarns             | None     | Shows your warnings in this server                                     | `.mywarns`                                   |

## ModLog

Mod logging

| Name   | Aliases | Description                       | Usage                              |
| ------ | ------- | --------------------------------- | ---------------------------------- |
| modlog | None    | Sets up mod logging for a channel | `.modlog [channel=<this channel>]` |

## Moderation

Moderation and server management commands.

| Name        | Aliases    | Description                                                                          | Usage                                          |
| ----------- | ---------- | ------------------------------------------------------------------------------------ | ---------------------------------------------- |
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
| --------------- | ---------- | ---------------------------------------------- | ------------------------------ |
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

| Name        | Aliases | Description                          | Usage          |
| ----------- | ------- | ------------------------------------ | -------------- |
| reportsetup | None    | Configure the message report feature | `.reportsetup` |

## Roles

Role based commands

| Name               | Aliases  | Description                                                  | Usage                       |
| ------------------ | -------- | ------------------------------------------------------------ | --------------------------- |
| rolemembers        | None     | Lists members that have a certain role                       | `.rolemembers <role>`       |
| togglerole         | None     | Toggles a role that this server has setup.                   | `.togglerole <roles...>`    |
| togglerole add     | None     | Adds a role to the list of toggleable roles for members      | `.togglerole add <role>`    |
| togglerole buttons | None     | Sets up role buttons                                         | `.togglerole buttons`       |
| togglerole delete  | `remove` | Removes a role from the toggleable role list                 | `.togglerole delete <role>` |
| togglerole list    | None     | Lists all the self-assignable roles this server has          | `.togglerole list`          |
| togglerole purge   | None     | Deletes all the toggleable roles you have set in this server | `.togglerole purge`         |

## Stats

Statistics related commands

| Name           | Aliases       | Description                                                  | Usage                        |
| -------------- | ------------- | ------------------------------------------------------------ | ---------------------------- |
| about          | None          | Gives information about the bot.                             | `.about`                     |
| ping           | None          | Tells you the ping.                                          | `.ping`                      |
| stats          | None          | Sends stats about which commands are used often in the guild | `.stats [member]`            |
| stats auditlog | `table` `log` | Shows command stats for the server through a table.          | `.stats auditlog [limit=50]` |

## Utilities

Commands that might be helpful

| Name      | Aliases | Description                                                                        | Usage                                                                                         |
| --------- | ------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| archive   | None    | An advanced message archive command                                                | `.archive [--limit=50] [--reverse] [--ignore-bots] [--channel] [--user] [--before] [--after]` |
| poll      | None    | Creates a simple poll with thumbs up, thumbs down, and shrug as a Discord poll.    | `.poll [hours] <question>`                                                                    |
| rpoll     | None    | Creates a simple reaction poll with thumbs up, thumbs down, and shrug as reactions | `.rpoll <question>`                                                                           |
| snowflake | None    | Tells you when a snowflake(s) was created                                          | `.snowflake [snowflakes...]`                                                                  |
