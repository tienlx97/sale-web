import { useState } from "react";
import { KeyValueSection } from "../../../coponents/key-value-section";
import { withIds } from "../../../utils/withIds";

export const ConstractInformation = () => {
  const [contractInfo, setContractInfoo] = useState(
    withIds([
      { key: "No.", value: "" },
      { key: "**Project**", value: "" },
      { key: "**Item**", value: "" },
      { key: "**Location**", value: "" },
    ]),
  );

  return (
    <KeyValueSection
      title="CONTRACT INFORMATION"
      value={contractInfo}
      onChange={setContractInfoo}
    />
  );
};
