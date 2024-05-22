# Gatekeeper (Verification System)

Lightning includes a verification system for your members under the name of "Gatekeeper". Gatekeeper is designed to be the barrier between your actual server members and scam bots.

## Set Up

In order to use Gatekeeper in your server, you will need to first set it up. Run @Lightning automod gatekeeper and follow through each button to set up your gatekeeper.

{% embed url="https://www.youtube.com/watch?v=-wFsG1d_hI8" %}


## FAQs

#### How does this actually work?
When a new member (we'll refer to him as John) enters your server via a Discord invite link, Lightning will immediately apply a verification role to John. John will now be forced to enter the verification channel and click the button in the message to verify himself. Once he clicked the Verify Me button, Lightning will remove the verification role from John. John will now have access to the server.

#### What happens if I delete the designated verification role?
Every member who is pending verification will be able to chat in your server. Gatekeeper will also disable itself and you'll be forced to set up another verification role.

#### What happens if I delete the verification channel?
Every member who is pending verification will no longer be able to verify at all. You can set up another channel and resend the verification message by reconfiguring the gatekeeper via `automod gatekeeper`.
