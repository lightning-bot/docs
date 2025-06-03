# AutoMod Configuration

Lightning's AutoMod system automatically detects and handles unwanted behavior like spam, hoisting, and excessive mentions to help keep your server clean and safe.

You can configure it via message or slash commands!

---

Run `.help automod` to start!

## AutoMod Rules

Lightning defines two different rules:
- **Advanced Rules** are fully customizable rules with time intervals and thresholds.
- **Basic Rules** are simple, predefined behavioral rules with no customization.


## Advanced AutoMod Rules
These rules are fully customizable with time intervals and thresholds, allowing you to adapt Lightning's AutoMod to your server’s specific moderation needs.

| Name | Description |
| ---- | ----------- |
| message-spam | Limits how many messages a user can send in the server during &#60;x&#62; seconds |
| mass-mentions | Limits how many mentions can be sent in &#60;x&#62; seconds |
| url-spam | Limits how many links can be sent in &#60;x&#62; seconds |
| invite-spam | Limits how many Discord invites can be sent in &#60;x&#62; seconds |
| message-content-spam | Limits how many duplicate messages can be sent during &#60;x&#62; seconds |

> When these rules are triggered, actions such as message deletion, timeouts, or warnings may be applied (depending on your configuration).


## Basic AutoMod Rules

Basic AutoMod Rules are pre-configured and act immediately when triggered — no extra setup required.

| Name | Description |
| ---- | ----------- |
| auto-dehoist | Automatically renames members with leading hoist characters (like, `!`, `#`) |
| auto-normalize | Normalizes a member's display name |


## Setting up an AutoMod rule

![Example usage](../assets/rules_add.gif)

- `automod rules add`

If you're wanting to set up a Basic AutoMod rule, you'll need to use `automod rules addbasic` instead!

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

