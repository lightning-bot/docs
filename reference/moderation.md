# Quick start with Moderation

A general quick start guide to using Lightning for moderation.


{% hint style="info" %}
This guide uses `.` as a prefix. Replace this with a prefix you setup Lightning with.
{% endhint %}


## Moderation Commands

### Warns, Kicks, Bans, Unbans

```
.kick @NewUser#5005 be nice
.warn @NewUser#5005 rule #4
.ban @NewUser#5005 cursing the roo with bad art
.unban @PreviouslyBannedUser#0004 appealed
```

### Removing messages

`.purge 25`

Additional subcommands exist for further options. See `.help purge` for an up-to-date list.


### Mutes & Unmutes

```
.mute @NewUser#5005 permanent mute until you behave
.unmute @NewUser#5005
```

{% hint style="info" %}
These commands require a mute role to be setup.
{% endhint %}

### Temporary Bans & Mutes

Timed mutes and timed bans can also be done through the bot.

These commands will do the inverse of their action (unban/unmute) after a certain period of time has passed.

```
.tempmute @WumpusPartay#4001 1d wumpus sticker spam
.tempban @Wumpus#7512 1d not following the wumpusparty emoji chain
.tempban @Wumpu$#3212 "2 weeks" bad behavior
```

## Infractions

Infractions are created when a moderation action has happened.
If your server has a modlog channel setup, those IDs will be displayed in the log message.

{% hint style="info" %}
You can also find the server's infraction list by running `.inf list`.
{% endhint %}

### Claiming an infraction

`.inf claim 5`

### Editing an infraction's reason

`.inf edit 5 User was spamming stickers and emojis`

### Transferring infractions to a user's new account

```
.inf transfer @OldUser#0010 @NewUser#5005
```

### Listing infractions

`.inf list` is the base command and will display all infractions in the server.

If you want specific infractions that were done to a user, use `.inf list [member]`.


{% hint style="info" %}
If you want to view a specific infraction, use `.inf view <id>`
{% endhint %}

```
.inf list @NewUser#5005
```

#### Listing specific infraction types
If you want to view specific infraction types, use `.inf list [action]`

You can also filter this by a member too! `.inf list [member] [action]`

Valid actions are:
- Warn
- Kick
- Mute
- Ban
- Timeban
- Unban
- Unmute
- Timemute
- Timeout
- Untimeout
