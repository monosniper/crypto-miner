import { useState } from "react";
import { MetamaskIcon } from "../icons";
import { Button } from "../ui";
import styles from "./MetamaskBtn.module.css";
import { useSDK } from "@metamask/sdk-react";

export const MetamaskBtn = () => {
  const { sdk, connected } = useSDK();
  const [account, setAccount] = useState<string>();

  const handleConnectWallet = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccount(accounts?.[0]);
    } catch (error) {
      console.error("Failed to connect to MetaMask", error);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button
        className={styles.metamaskBtn}
        icon={!connected ? <MetamaskIcon /> : undefined}
        onClick={handleConnectWallet}
        title={connected ? "Metamask connected" : undefined}
      />

      {connected && (
        <p className="text-sm text-base-content-200">
          Connected account: {account}
        </p>
      )}
    </div>
  );
};
