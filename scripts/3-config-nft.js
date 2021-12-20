import sdk from "./1-initialize-sdk.js";
import { readFileSync } from 'fs';

const bundleDrop = sdk.getBundleDropModule("0xDF71887D4B448a42C57eeb1E6feb434c5F8232b0");

(async () => {
    try{
        await bundleDrop.createBatch([
            {
                name: "CharityDAO ticket",
                description: "This NFT will give you access to CharityDAO!",
                image: readFileSync("scripts/assets/ticket.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch(error){
        console.error("failed to create the new NFT", error);
    }
})();