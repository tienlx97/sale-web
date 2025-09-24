import { Text } from "@fluentui/react-components";
import { useState } from "react";
import { KeyValueSection } from "../../../coponents/key-value-section";
import { withIds } from "../../../utils/withIds";

export const Parties = () => {
  const [partyA, setPartyA] = useState(
    withIds([
      { key: "**PARTY A (BUYER)**", value: "" },
      { key: "**Represented by**", value: "" },
      { key: "Position", value: "" },
      { key: "Address", value: "" },
    ]),
  );

  const [partyB, setPartyB] = useState(
    withIds([
      {
        key: "**PARTY A (BUYER)**",
        value: "DAI NGHIA INDUSTRIAL MECHANICS CO.",
      },
      { key: "**Represented by**", value: "MR. Le Xuan Nghia" },
      { key: "Position", value: "General Director" },
      {
        key: "Address",
        value:
          "No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam",
      },
      {
        key: "Tax Code",
        value: "3702682454",
      },
    ]),
  );

  return (
    <div>
      <Text size={400} weight="semibold">
        PARTIES
      </Text>
      <br />
      <KeyValueSection title="__A__" value={partyA} onChange={setPartyA} />
      <br />
      <KeyValueSection title="__B__" value={partyB} onChange={setPartyB} />
    </div>
  );
};
