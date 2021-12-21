import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule('0x7A7de1E769D99a1a4BA18Cb2a1418457A7A24584');

(async () => {
    try{
        const amount = 100_000_000;
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "✅ There now is",
            ethers.utils.formatUnits(totalSupply, 18),
            "$GOOD in circulation",
        );
    } catch(error){
        console.error("Failed to print money", error);
    }
})();