import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule('0x51311A2b252A2E6D475C780d688b466Ee5594127');

(async () => {
    try { 
        const tokenModule = await app.deployTokenModule({
            name: 'CharityDAO Governance Token',
            symbol: 'GOOD',
        });

        console.log(
            "✅ Successfully deployed token module, address:",
            tokenModule.address,
        );
    } catch(error){ 
        console.error("failed to deploy token module", error);
    }
})();