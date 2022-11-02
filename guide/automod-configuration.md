# Automod Configuration

Lightning's AutoMod can be setup via message commands!

---

Run `.help automod` to start!

## Automod Types Reference

| Name | Description |
| ---- | ----------- |
| message-spam | Automod type for controlling how many messages can a user send in the server during x seconds |
| mass-mentions | Automod type for controlling how many mentions can be sent in a single message |
| url-spam | Automod type for controlling how many links can be sent during x seconds |
| invite-spam | Automod type for controlling how many invites can be sent during x seconds |
| message-content-spam | Automod type for controlling how many messages containing the same content can be sent during x seconds |

## Setting up an AutoMod rule

![Example usage](../assets/rules_add.gif)

- `automod rules add`

## Removing an AutoMod rule

![Example usage](../assets/rules_remove.gif)

- `automod rules remove`

## AutoMod Ignores

### Setting up AutoMod ignores

- `automod ignore`

You can add roles, members, and channels to the ignored list.

{% hint style="info" %}
If you add a channel to the ignored list, AutoMod will ignore all messages in that channel.
{% endhint %}

### Removing an ignore

- `automod unignore`

{% hint style="info" %}
If you don't know what is currently ignored, use `automod ignored`
{% endhint %}

### Who is ignored by AutoMod?

The following are checked in the following order to determine if you are ignored from AutoMod:

- You have a higher role than the bot does.
- You are exempt from AutoMod by permission level configuration
    - Either you're specifically added to a permission level or have a role that is Trusted or higher
- You are exempt from AutoMod by AutoMod Default Ignores

