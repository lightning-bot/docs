# Gatekeeper (Verification System)

Gatekeeper is Lightning's member verification system. It helps block spam and scam bot joins before they can talk in your server.

## Set Up

To enable Gatekeeper, run `@Lightning automod gatekeeper` and complete the setup buttons in the UI.

During setup, you will choose:

1. A verification role
2. A verification channel
3. A verification type
4. The verification message

{% embed url="https://www.youtube.com/watch?v=-wFsG1d_hI8" %}


## Verification types

- **Basic**: Member clicks **Verify Me**.
- **Honeypot**: Member must click the safe option; wrong choices can trigger a kick attempt.

## FAQs

#### How does this actually work?
When a new member joins, Lightning immediately applies your verification role. That role keeps them restricted until they go to your verification channel and complete verification. After they verify, Lightning removes the verification role and they can access the rest of the server.

#### What happens if I delete the designated verification role?
Pending members may no longer be restricted properly, and Gatekeeper will disable itself. Re-run `@Lightning automod gatekeeper` to configure a new verification role.

#### What happens if I delete the verification channel?
Pending members will not be able to verify. Create/configure a new channel, then re-run `@Lightning automod gatekeeper` to resend the verification message.

## Quick troubleshooting

- Members are stuck verifying: confirm the verification channel still exists and members can see it.
- Verification not removing role: check Lightning has Manage Roles and that the verification role is below Lightning's role.
- Gatekeeper disabled itself: verify that both the verification role and channel still exist.
