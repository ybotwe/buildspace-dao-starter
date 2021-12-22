import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = sdk.getBundleDropModule(
    '0xDF71887D4B448a42C57eeb1E6feb434c5F8232b0'
);

const tokenModule = sdk.getTokenModule(
    '0x7A7de1E769D99a1a4BA18Cb2a1418457A7A24584'
);

(async () => {
    try {

        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
        if (walletAddresses.length === 0){
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map((address) => {
            const calculatedAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", calculatedAmount, "tokens to", address);

            const airdropTarget = {
                address,
                // Remember, we need 18 decimal placees!
                amount: ethers.utils.parseUnits(calculatedAmount.toString(), 18),
            };
        
            return airdropTarget;
        });

        console.log("🌈 Starting airdrop...")
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");

    } catch(err){
        console.error("Failed to airdrop tokens", err);
    }
})();