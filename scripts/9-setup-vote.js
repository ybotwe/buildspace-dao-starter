import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    '0x39d97089380c9bA52cc2E1b08878846a78139cc9'
);

const tokenModule = sdk.getTokenModule(
    '0x7A7de1E769D99a1a4BA18Cb2a1418457A7A24584'
);

(async () => {
    try{
        // Give our treasury the power to mint additional token if needed.
        await tokenModule.grantRole('minter', voteModule.address);

        console.log(
            "Successfully gave vote module permissions to act on token module"
        );
    } catch(error){
        console.error(
            "failed to grant vote module permissions on token module",
            error
        );
        process.exit(1);
    }

    try{

        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address,
            percent90
        );

        console.log("✅ Successfully transferred tokens to vote module");
    }catch(err){
        console.error("failed to transfer tokens to vote module", err);
    }
})();