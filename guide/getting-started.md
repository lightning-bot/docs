# Getting Started

Welcome to Lightning. This page helps you get from "just invited the bot" to "ready for moderation" in a few minutes.

Need a hand? Join the [support server](https://short.lightsage.dev/discord).

## 5-minute setup checklist

1. Pick how you want to run commands (mention only, or mention + custom prefix).
2. Set a mute role (optional, but recommended).
3. Test one moderation command in a private channel.
4. Continue with AutoMod, ModLog, and Reports in the other guide pages.

## Prefix

By default, Lightning always responds to its mention (`@Lightning`). This mention prefix cannot be removed.

The guide shows this as `@Lightning help`. In Discord, type `@Lightning` and select the bot from the mention suggestions, then type a space and the command (for example, `help`). Copying the example as plain text may not create an actual mention.

Command examples use the mention prefix by default. If your server has a custom prefix, choose **Custom prefix** above the article to match it.

You can also add one or more custom prefixes.

Run `@Lightning config prefix` & click on the Add Prefix button to add a new custom prefix.

## Mute Role (Optional)

{% hint style="danger" %}
If you do not set a mute role, Lightning will use timeouts for timed mutes. If the duration for a mute is over 28 days, you will be forced to set a mute role!
{% endhint %}

If your server already has a Muted role, set it with:

`{{ selected_prefix }}config muterole <role>`

If you do not have one yet:

1. Create a new role in Server Settings (for example: `Muted`).
2. Run `{{ selected_prefix }}config muterole <role>`.
3. Run `{{ selected_prefix }}config muterole update` to apply channel permission overrides.

## What to do next

- Configure [AutoMod](automod-configuration.md) to reduce spam.
- Configure [ModLog](modlog.md) so staff actions are visible and searchable.
- Configure [Message Reports](reports-configuration.md) so members can report bad messages quickly.
- Configure [Gatekeeper](gatekeeper-configuration.md) if your server gets frequent bot joins.

