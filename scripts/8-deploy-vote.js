import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
    '0x51311A2b252A2E6D475C780d688b466Ee5594127'
);

(async () => {
    try {
      const voteModule = await appModule.deployVoteModule({
        // Give your governance contract a name.
        name: "CharityDAO's Proposals",
  
        // This is the location of our governance token, our ERC-20 contract!
        votingTokenAddress: "0x7A7de1E769D99a1a4BA18Cb2a1418457A7A24584",
  
        // After a proposal is created, when can members start voting?
        // For now, we set this to immediately.
        proposalStartWaitTimeInSeconds: 0,
  
        // How long do members have to vote on a proposal when it's created?
        // Here, we set it to 24 hours (86400 seconds)
        proposalVotingTimeInSeconds: 24 * 60 * 60,
  
        // Will explain more below.
        votingQuorumFraction: 0,
  
        // What's the minimum # of tokens a user needs to be allowed to create a proposal?
        // I set it to 0. Meaning no tokens are required for a user to be allowed to
        // create a proposal.
        minimumNumberOfTokensNeededToPropose: "1000",
      });
  
      console.log(
        "✅ Successfully deployed vote module, address:",
        voteModule.address,
      );
    } catch (err) {
      console.log("Failed to deploy vote module", err);
    }
  })();
  