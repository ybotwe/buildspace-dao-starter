import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    '0x39d97089380c9bA52cc2E1b08878846a78139cc9'
);

const tokenModule = sdk.getTokenModule(
    '0x7A7de1E769D99a1a4BA18Cb2a1418457A7A24584'
);

(async () => {
    try {
      const amount = 420_000;
      await tokenModule.delegateTo(process.env.WALLET_ADDRESS);
      // Create proposal to mint 420,000 new token to the treasury.
      await voteModule.propose(
        "Should the DAO mint an additional " + amount + " tokens into the treasury?",
        [
          {
            // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
            // to send in this proposal. In this case, we're sending 0 ETH.
            // We're just minting new tokens to the treasury. So, set to 0.
            nativeTokenValue: 0,
            transactionData: tokenModule.contract.interface.encodeFunctionData(
              // We're doing a mint! And, we're minting to the voteModule, which is
              // acting as our treasruy.
              "mint",
              [
                voteModule.address,
                ethers.utils.parseUnits(amount.toString(), 18),
              ]
            ),
            // Our token module that actually executes the mint.
            toAddress: tokenModule.address,
          },
        ]
      );
  
      console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
      console.error("failed to create first proposal", error);
      process.exit(1);
    }
  
    try {
      const amount = 6_900;
      await tokenModule.delegateTo(process.env.WALLET_ADDRESS);
      // Create proposal to transfer ourselves 6,900 token for being awesome.
      await voteModule.propose(
        "Should the DAO transfer " +
        amount + " tokens from the treasury to " +
        process.env.WALLET_ADDRESS + " who's currently sick?",
        [
          {
            // Again, we're sending ourselves 0 ETH. Just sending our own token.
            nativeTokenValue: 0,
            transactionData: tokenModule.contract.interface.encodeFunctionData(
              // We're doing a transfer from the treasury to our wallet.
              "transfer",
              [
                process.env.WALLET_ADDRESS,
                ethers.utils.parseUnits(amount.toString(), 18),
              ]
            ),
  
            toAddress: tokenModule.address,
          },
        ]
      );
  
      console.log(
        "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
      );
    } catch (error) {
      console.error("failed to create first proposal", error);
    }
  })();
  