const Recipients = ({ tokenSymbol, textValue, setTextValue }) => {
  return (
    <div className="pt-16">
      <h3 className="text-2xl font-light italic">recipients and amounts</h3>
      <p className="pt-3 text-l font-light">
        enter one address and amount in {tokenSymbol} on each line. supports this
        format.
      </p>
      <textarea
        spellCheck="false"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        className="block border-b-2 border-black outline-none px-2 py-2 mt-4 h-32"
        style={{
          width: "100%",
          background: "aquamarine",
          color: "black",
        }}
        placeholder="0x422938990FED07aEb904260b1094943afC2e366d=1.41421
        0x633E8B8aDCE8d98EbC2ae2b8ef2d176221e58a70=10.5
        0x97f67736CcF4da7cD5a12752dF3B1548Fb90699e=11.111"
      ></textarea>
    </div>
  );
};

export default Recipients;
