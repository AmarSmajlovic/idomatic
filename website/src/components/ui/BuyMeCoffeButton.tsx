import Image from "next/image";
import React from "react";

const BuyMeCoffeButton = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/AmarSmajlovic"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/bmc-button.png"
        alt="Buy me a coffee"
        width={150}
        height={20}
      />
    </a>
  );
};

export default BuyMeCoffeButton;
