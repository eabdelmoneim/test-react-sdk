import { ConnectWallet, Web3Button, useAddress, useBurnNFT, useContract } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {

  const {contract} = useContract("0x5b93F6274d5FDaE856B4E804bF9a83Cd1095A43c");
  const address = useAddress();
  
  const {
    mutate: burnNft,
    isLoading,
    error,
  } = useBurnNFT(contract);

  if (error) {
    console.error("failed to burn NFT", error);
  }

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Welcome to{" "}
            <span className="gradient-text-0">
              <a
                href="https://thirdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                thirdweb.
              </a>
            </span>
          </h1>

          {!address?  (
            <>
          <div className="connect">
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
            
          </div>
          </>
          ) : (
         <>  
    <Web3Button
      contractAddress={contract?.getAddress() as string}
      action={() =>
        burnNft({
          tokenId: "1",
          amount: "1",
        })
      }
    >
      Burn NFT
    </Web3Button>
    </>
          )}
        </div>
      </div>
    </main>
  );
}
