# Privacy Policy

**Last updated: September 13, 2026**

This policy explains how Lightning (also known as Lightning#2270), a Discord bot operated by Célveren (“we,” “us,” or “our”), collects, uses, stores, and shares information. It covers the hosted Lightning bot; independently operated copies of its source code may have different privacy practices.

## Information we collect

Lightning receives information through Discord when you use its commands, interact with its features, or participate in a server where it operates. Some processing, such as moderation and message activity tracking, can occur even if you do not directly use a command. The information processed depends on the bot's permissions and enabled features.

- **Discord account and server information:** User, server, channel, role, and message IDs; usernames and display names; server names and owner IDs; and member, role, and permission information needed to operate features. Discord IDs can identify an account and are treated as personal information.
- **Server configuration:** Command prefixes and permissions, moderation and logging settings, AutoMod rules and exemptions, role menus, welcome messages, report channels, and webhook details used to deliver configured notifications.
- **Moderation and safety records:** The affected user and moderator IDs, action taken, reason, timestamps, duration or expiry, active status, and related evidence or metadata. This can include message excerpts associated with AutoMod actions, saved roles and punishment roles, and verification or pending-member records.
- **Message reports:** Reported message and channel IDs, reporter IDs, report reasons and times, and report status. Lightning can copy the reported message's content, author information, and attachment names and links into the server's report channel.
- **Reminders and preferences:** Reminder text, your user ID, the destination channel and original message ID where applicable, creation and scheduled times, and your selected timezone.
- **Command usage:** User, server, and channel IDs; the command name; when it was used; whether it failed; and whether it was an application command. Operational logs can also contain command text or arguments, usernames, and server and channel names, including commands used in direct messages.
- **Message activity:** The first and most recent message activity timestamps recorded for a user in a server, including activity from message edits. These records support features such as anti-scam checks and do not themselves contain message text.
- **Diagnostics:** Error messages, stack traces, event context, performance measurements, and service statistics. Error context can include user details, command content, and other information involved in an error.

Lightning also processes message content to run commands and check for spam or scams. AutoMod temporarily caches relevant message content and identifiers so it can identify messages responsible for a rule violation and provide moderation evidence.

## How we use information

We use this information to:

- Run commands, deliver reminders, and remember user and server settings.
- Apply moderation rules, manage roles and verification, investigate reports, and help protect servers from spam, scams, and abuse.
- Display moderation records, configured logs, and command statistics, including server command-usage rankings and member statistics.
- Diagnose failures, monitor performance, maintain reliability, and improve Lightning's features.
- Handle support and privacy requests and enforce restrictions on misuse of the bot.

## Where information is stored

Lightning and its bot-managed storage are hosted on a **Hetzner virtual private server (VPS) located in the United States**. Information is stored in databases, caches, and operational logs as needed for the purposes above. If you use Lightning from another country, your information will be processed in the United States.

Copies sent to Discord or another service described below are also subject to that service's storage locations and privacy practices. The US hosting location does not mean that every recipient stores its copies only in the United States.

## Who can receive information

Information is available to the bot operator as needed to operate and support Lightning. It may also be disclosed through these features and services:

- **Discord and server members:** Lightning sends replies, reminders, moderation notifications, reports, and logs through Discord. Who can see them depends on the destination and its permissions. Authorized moderators can view report details, including reporter identities and reasons. Command-statistics features can expose usage information to members who can access those commands. Discord handles information under its own [Privacy Policy](https://discord.com/privacy).
- **Hetzner (hosting provider):** Hetzner supplies the VPS infrastructure on which Lightning processes and stores the bot data described in this policy, including databases, caches, and operational logs. Célveren manages Lightning and its use of that data. For information about Hetzner's own privacy practices, see [Hetzner's Privacy Policy](https://www.hetzner.com/legal/privacy-policy/).
- **Error reporting:** When configured, Lightning uses Sentry for diagnostics and performance monitoring. Reports can include Discord user IDs and usernames, command content, event context, and error details. Diagnostic alerts can also be sent to operator-configured Discord webhooks.
- **Text hosting:** Lightning can upload long command output, reminder text, or error traces to its configured paste service and return a link. Anyone with access to a resulting link may be able to read that content.
- **External command services:** Commands that use external services disclose the information needed for that feature. For example, QR-code links include the submitted text in a QR Server URL, and homebrew application searches send the search term to the configured application-directory service. Opening a generated link can send information to the linked service.
- **Bot listing services:** When configured, Lightning sends aggregate server, shard, or user counts to services such as top.gg, discord.bots.gg, and Discord Bot List. These statistics submissions do not include individual users' message content.

We do not sell personal information or use it for targeted advertising.

## How long information is kept

Retention depends on the type of information and the feature using it:

- **Temporary AutoMod message content** is encrypted in the cache and expires within a maximum of 24 hours. It can be removed sooner after a rule triggers. This limit applies to the temporary content cache, not to excerpts subsequently saved as moderation evidence or posted to Discord.
- **Reminders and scheduled actions** are removed from the timer store when dispatched or canceled. Delivered messages, operational logs, and related moderation records can remain separately.
- **Settings, moderation records, reports, role state, command statistics, and message activity records** can remain until removed through the relevant feature or an operator-handled request. There is no single automatic expiry period for all of these records.
- **Operational log files** rotate based on file size, so their retention varies with activity. Data sent to Discord, Sentry, or a paste service follows the relevant service's retention and deletion arrangements.

Removing Lightning from a server, leaving a server, or deleting an original message does not necessarily erase previously stored records or copies posted by the bot. Some features rely on a separate backend service, so deletion of all associated records may require the operator's assistance.

## Your choices and privacy requests

You can delete or clear your reminders and remove your saved timezone using Lightning's reminder commands. Server administrators can change enabled features, adjust the bot's permissions, remove configuration through available commands, or remove Lightning from their server.

To ask what information Lightning holds about you, or to request access, correction, or deletion, contact Célveren through the [Lightning support server](https://discord.gg/SpFjsy3). Include your Discord user ID and any relevant server IDs, along with a description of your request. Ask for a private contact method before sharing sensitive details. We may need to verify that you control the account or are authorized to act for the server.

We will review requests in accordance with applicable law. If information must be retained or a request cannot be completed, we will explain the reason. Removing data needed for a feature may prevent that feature from working. For messages or logs in a Discord server, you may also need to contact that server's administrators; requests concerning Discord's own records should be directed to Discord.

## Changes to this policy

We may update this policy as Lightning's features or privacy practices change. The date at the top identifies the latest revision. For questions about this policy or Lightning's handling of your information, contact Célveren through the support server linked above.
