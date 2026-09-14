# Moderator reference

Forgot which command does what? You're in the right place. Find what you need below, pick an example, and swap in the member, channel, and reason for your situation.

{% hint style="info" %}
Choose your server’s prefix using the command example selector above, and replace `@Member` with an actual mention. Numbers like `123456789012345678` stand in for a user or message ID. For a command's full options, try `{{ selected_prefix }}help command`, such as `{{ selected_prefix }}help purge`.
{% endhint %}

## Which command do I need?

| I want to… | Use | What happens |
| --- | --- | --- |
| Record a warning | `{{ selected_prefix }}warn` | Adds a warning to the member's record. |
| Give someone a short break | `{{ selected_prefix }}timeout` | Applies a Discord timeout for up to 28 days. |
| Apply the server's mute role | `{{ selected_prefix }}mute` or `{{ selected_prefix }}timemute` | Mutes indefinitely or for a set time; see the mute notes below. |
| Remove someone from the server | `{{ selected_prefix }}kick` | Removes them, but they can rejoin with an invite. |
| Prevent someone from rejoining | `{{ selected_prefix }}ban` or `{{ selected_prefix }}timeban` | Bans them until you unban them, or until the timer ends. |
| Remove messages | `{{ selected_prefix }}purge` | Searches recent messages and deletes those matching your filters. |
| Pause a busy channel | `{{ selected_prefix }}lock` | Restricts posting through the channel's `@everyone` permissions. |
| Check someone's history | `{{ selected_prefix }}inf list @Member` | Shows their recorded infractions. |

## Warn, kick, or ban a member

Add a short, specific reason so the next moderator can understand what happened. For example, “Repeated personal attacks after a warning” is more useful than “Bad behavior.”

```text
{{ selected_prefix }}warn @Member Repeated off-topic posts after a reminder
{{ selected_prefix }}kick @Member Disrupting voice chat after a warning
{{ selected_prefix }}ban @Member Posting scam links
```

A kick allows the member to come back with an invite. A ban keeps them out until it is lifted. A regular ban does **not** delete their old messages by default.

### Ban and remove recent messages

Use `--delete` to remove up to 7 days of the user's message history when banning them:

```text
{{ selected_prefix }}ban @Member Posting scam links --delete 1
```

Here, `1` means one day. `{{ selected_prefix }}bandel @Member Posting scam links` is a shortcut for banning and deleting one day of messages.

### Ban for a set time

```text
{{ selected_prefix }}timeban @Member 7d Repeated harassment
```

Lightning automatically lifts the ban when the time is up. `{{ selected_prefix }}tempban` is another name for `{{ selected_prefix }}timeban`. Lifting a ban lets the person rejoin; it does not add them back to the server.

### Lift a ban early

Use the banned person's user ID:

```text
{{ selected_prefix }}unban 123456789012345678 Appeal accepted
```

### Ban several users at once

```text
{{ selected_prefix }}massban @MemberOne @MemberTwo Coordinated scam spam
```

Lightning asks you to confirm first. This command requires a reason, does not DM the users, and does not delete their message history.

## Timeouts and mutes

**Timeout** uses Discord's built-in timeout. **Mute** uses your server's configured mute role, so its restrictions depend on how that role is set up.

### Give someone a timeout

```text
{{ selected_prefix }}timeout @Member 30m Repeatedly interrupting the conversation
{{ selected_prefix }}untimeout @Member Issue resolved
```

A timeout expires automatically, and `{{ selected_prefix }}untimeout` removes it early. The maximum timeout is **28 days**.

### Use a mute role

```text
{{ selected_prefix }}mute @Member Muted pending moderator review
{{ selected_prefix }}timemute @Member 1d Repeated spam
{{ selected_prefix }}unmute @Member Review complete
```

- `{{ selected_prefix }}mute` has no expiry and needs a mute role configured by your server's admins.
- `{{ selected_prefix }}timemute` removes the mute role when its timer ends. `{{ selected_prefix }}tempmute` is an alias.
- If no usable mute role is configured, `{{ selected_prefix }}timemute` can use a timeout instead for a current member, provided Lightning has permission and the duration is within 28 days.
- `{{ selected_prefix }}unmute` removes a timeout first if the member has one. If they also have a mute role, run it again to remove that role.

### Remembering durations

Put the duration right after the member: `30m` means 30 minutes, `2h` means 2 hours, and `7d` means 7 days. Put durations containing spaces in quotes:

```text
{{ selected_prefix }}timeban @Member "2 weeks" Repeated harassment
```

## Will Lightning DM the member?

Warnings, kicks, bans, mutes, timeouts, and timed bans or mutes follow your server's notification setting. You can override it for one action with `--dm true` or `--dm false`:

```text
{{ selected_prefix }}warn @Member Please keep spoilers in the spoiler channel --dm true
{{ selected_prefix }}ban @Member Posting scam links --dm false
```

These options don't apply to every command; for example, `{{ selected_prefix }}massban` never sends DMs. A requested DM may still fail to reach the member, so don't assume they received it.

## Remove messages

### Clear recent messages

```text
{{ selected_prefix }}purge 25
```

Without filters, this deletes the messages found in the search. The number is **how many messages to look through**, not a promise to delete that many. You can search 1–300 messages at a time; searches of 150 or more ask for confirmation.

### Delete only matching messages

| To remove… | Example |
| --- | --- |
| One user's messages among the last 100 | `{{ selected_prefix }}purge 100 --user @Member` |
| Messages with attachments | `{{ selected_prefix }}purge 50 --attachments true` |
| Messages from bots | `{{ selected_prefix }}purge 50 --bots true` |
| Messages before a message ID | `{{ selected_prefix }}purge 50 --before 123456789012345678` |
| Messages after a message ID | `{{ selected_prefix }}purge 50 --after 123456789012345678` |

Filters combine: `{{ selected_prefix }}purge 100 --user @Member --attachments true` only removes that user's messages **with attachments** within the search.

Add `--archive true` to receive a file containing the removed messages:

```text
{{ selected_prefix }}purge 100 --user @Member --archive true
```

Deleting messages cannot be undone. An archive keeps a copy; it does not restore them to the channel.

### Clean up Lightning's replies

```text
{{ selected_prefix }}clean 50
```

This looks through up to 50 recent messages and removes only Lightning's messages from the last 14 days. It defaults to searching 100 messages, which is also the maximum. To choose another channel, use `{{ selected_prefix }}clean 50 #bot-commands`.

## Lock or unlock a channel

```text
{{ selected_prefix }}lock #general
{{ selected_prefix }}unlock #general
```

Leave out the channel to use the current one. Lightning asks for confirmation when you lock the channel you're in. `{{ selected_prefix }}lockdown` is an alias for `{{ selected_prefix }}lock`.

Locking denies `@everyone` permission to send messages, add reactions, and create public or private threads. Other role or member permissions may still allow people to post.

Unlocking resets those four `@everyone` overrides to inherit permissions. It does **not** restore a saved copy of the channel's previous settings, so check channels that normally have custom restrictions.

To lock and archive a thread, use `{{ selected_prefix }}lock thread` inside it, or `{{ selected_prefix }}lock thread <thread ID>` elsewhere. `{{ selected_prefix }}unlock` is for text channels; reopen threads through Discord's thread controls.

## Look up and update infractions

An **infraction** is a record of a moderation action. Its ID identifies that record, not the member. You can find IDs in `{{ selected_prefix }}inf list` or your server's configured [modlog channel](../guide/modlog.md).

### Find the record you need

| I want to see… | Command |
| --- | --- |
| The server's infraction history | `{{ selected_prefix }}inf list` |
| One member's history | `{{ selected_prefix }}inf list @Member` |
| One specific record | `{{ selected_prefix }}inf view 5` |
| All recorded bans | `{{ selected_prefix }}inf list Ban` |
| One member's warnings | `{{ selected_prefix }}inf list @Member Warn` |

Action filters include `Warn`, `Kick`, `Mute`, `Ban`, `Timeban`, `Unban`, `Unmute`, `Timemute`, `Timeout`, and `Untimeout`. Use `Timeban` and `Timemute` here, even if you used the `tempban` or `tempmute` command aliases.

### Correct or take responsibility for a record

Replace `5` with the infraction ID:

```text
{{ selected_prefix }}inf claim 5
{{ selected_prefix }}inf edit 5 Repeated sticker spam after two reminders
```

`{{ selected_prefix }}inf claim` sets you as the responsible moderator. `{{ selected_prefix }}inf edit` replaces the reason **and sets you as the responsible moderator**. Editing the record does not reverse the original action; use `{{ selected_prefix }}unban`, `{{ selected_prefix }}unmute`, or `{{ selected_prefix }}untimeout` as appropriate.

### Move records to a new account

```text
{{ selected_prefix }}inf transfer @OldAccount @NewAccount
```

This moves the old account's infraction records to the new account after confirmation. It requires Lightning's Admin command level and transfers records, not active bans or mute roles.

## Tidy up display names

- `{{ selected_prefix }}normalize @Member` converts a member's display name to an ASCII version where possible, making stylized characters easier to read.
- `{{ selected_prefix }}dehoist` checks the whole server for names starting with common characters used to jump to the top of the member list and adjusts them. Use `{{ selected_prefix }}dehoist !` to target a particular starting character. This command has a five-minute server cooldown.

## A command isn't working

Check the error message first—it often points to what's missing.

- **Missing permissions?** Both your access and Lightning's permissions matter. Ask an admin to check command access, channel permissions, and role order if Lightning cannot act on a member or manage a role.
- **No mute role?** Ask an admin to configure one, or use `{{ selected_prefix }}timeout` for a break of up to 28 days.
- **Can't find the person?** Use a fresh mention or a user ID. For an unban, the banned user's ID is the easiest option.
- **Fewer messages deleted than expected?** Purge filters only apply within the number of messages searched. Try a larger search, up to 300.
- **Forgot the options?** Use `{{ selected_prefix }}help command` or open the [command list](command-list.md).
