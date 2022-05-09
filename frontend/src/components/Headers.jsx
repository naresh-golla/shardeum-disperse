import { useContext } from "react";
import { NetworkContext } from "../App";
import ShardeumSVG from "../assets/Layer_dark.svg";
// import EthereumSVG from "../assets/ethereum.svg";

const Header = ({ address }) => {
  const networkContext = useContext(NetworkContext);
  return (
    <div>
      <div className="flex space-between">
        <img
          src={ShardeumSVG}
          style={{
            width: "50px",
            height: "50px",
            marginLeft: "-50px",
          }}
          alt="Ethereum SVG"
        />
        <h2 className="mt-8 text-4xl font-light">disperse</h2>
        {address && (
          <span className="text-l pt-2 gradiant text-2xl">
            {networkContext.network || "🤔"}
          </span>
        )}
      </div>
      <div></div>
      <p className="pt-8 text-l font-light">
        <i>verb</i> distribute shardeum or tokens to multiple addresses in single transaction
      </p>
    </div>
  );
};

export default Header;
