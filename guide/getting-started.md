# Getting Started

For additional help, join the [support server](https://short.lightsage.dev/discord)!

## Prefix

By default, the bot's prefix is it's mention (@Lightning) and cannot be removed. However, you can add custom prefixes that the bot will respond to.

Run `@Lightning config prefix` & click on the Add Prefix button to add a new custom prefix.

## Mute Role (Optional)

{% hint style="danger" %}
If you do not set a mute role, Lightning will use timeouts for timed mutes. If the duration for a mute is over 28 days, you will be forced to set a mute role!
{% endhint %}

You can assign an existing Muted role for Lightning to use by using `@Lightning config muterole <role>`.

If you don't have a Muted role, you can create a new role in your server's settings, then use `@Lightning config muterole <role>`, then run `@Lightning config muterole update` to set the proper permissions in every channel. 

