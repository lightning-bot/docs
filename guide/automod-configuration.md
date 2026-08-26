# AutoMod Configuration

AutoMod helps you reduce spam and keep your server readable by automatically taking moderation actions when limits are hit.

You can use both slash commands (recommended) and prefix commands:
- Slash: `/automod ...`
- Prefix: `.automod ...`

{% hint style="info" %}
You need Manager Server permission access to configure AutoMod.
{% endhint %}

## Quick start (2 minutes)

1. Open the interactive setup:

```
/automod rules interactive
```

2. Create one or two core rules:
- Message spam: `5/10s` with `warn` or `delete`
- Invite spam: `1/30s` with `delete` or `warn`

3. Add channels/roles you want ignored:

```
/automod ignore #staff @moderators
```

4. Check your final setup:

```
/automod view
```

---

## How AutoMod rules work

Each advanced rule uses:
- A **limit** (`count`)
- A **time window** (`seconds`)
- A **punishment** (`delete`, `warn`, `mute`, `kick`, or `ban`)

Example:

```
/automod rules add message-spam 5/10s warn
```

This means: on the 5th message in 10 seconds, AutoMod triggers.

You can write intervals in two formats:
- `5/10s`
- `5 10`

If you use `mute` or `ban`, you can add a duration:

```
/automod rules add message-spam 5/10s mute 30m
```

---

## Advanced rules

| Rule | What it checks |
| --- | --- |
| `message-spam` | How many total messages a member sends in the time window. |
| `mass-mentions` | How many user/role mentions are in a message burst. |
| `url-spam` | Messages containing `http://` or `https://` links. |
| `invite-spam` | Messages containing Discord invite links (`discord.gg` / `discord.com/invite`). |
| `message-content-spam` | Repeated messages (tracked by member + message length). |

{% hint style="warning" %}
`message-content-spam` is currently tracked by message length, not exact text match.
{% endhint %}

Common commands:

```
/automod rules add <rule> <count>/<seconds>s <delete|warn|mute|kick|ban> [duration]
/automod rules remove <rule>
```

---

## Basic rules (name cleanup)

Basic rules do not use a rate limit. They are simple on/off protections.

| Rule | What it does |
| --- | --- |
| `auto-dehoist` | Renames display names that start with common hoist characters (like `!`, `#`, `$`). |
| `auto-normalize` | Normalizes display names to a cleaner ASCII-like form. |

Commands:

```
/automod rules addbasic <auto-dehoist|auto-normalize>
/automod rules remove <auto-dehoist|auto-normalize>
```

---

## Ignores (exemptions you control)

You can exclude roles, members, channels, and threads from AutoMod.

Commands:

```
/automod ignore <entities...>
/automod unignore <entities...>
/automod ignored
```

Examples:

```
/automod ignore @moderators #staff-chat
/automod unignore #staff-chat
```

{% hint style="info" %}
If you ignore a channel or thread, AutoMod ignores messages sent there.
{% endhint %}

AutoMod also skips some messages automatically, including DMs, bot messages, and members who are trusted by your server's Lightning permission config.

---

## Warn threshold (separate from spam rules)

Warn threshold is a server-wide escalation rule:
- If a member reaches X warnings, Lightning automatically `kick`s or `ban`s them.
- This is based on warning infractions, not just AutoMod warnings.

Commands:

```
/automod warnthreshold set <1-10> <kick|ban>
/automod warnthreshold remove
/automod warnthreshold migrate
```

---

## Gatekeeper (join verification)

Gatekeeper restricts new members until they verify.

Start setup:

```
/automod gatekeeper
```

The setup UI lets you:
- Choose/create a verification role
- Choose a verification channel
- Pick a verification type
- Send (or update) the verification message
- Enable/disable Gatekeeper

Verification types:
- **Basic**: Member clicks **Verify Me**.
- **Honeypot**: Member must click the one safe button; wrong choice attempts a kick.

{% hint style="info" %}
Lightning needs Manage Roles and Manage Channels to run Gatekeeper setup and keep it working.
{% endhint %}

---

## Troubleshooting

- **"This rule has already been set up"**: remove it first, then add it again.
- **AutoMod not triggering**: check `/automod view`, then confirm the user/channel/role is not ignored.
- **Muted users are not being muted**: ensure your mute role/config is valid if timeout cannot be used.
- **Not sure what is active?** use `/automod view`.

## Recommended starter profile

If you are new, start with:
- `message-spam` -> `5/10s` -> `warn`
- `invite-spam` -> `1/30s` -> `delete`
- `mass-mentions` -> `6/10s` -> `warn`

Then adjust once you see real traffic patterns in your server.

