import { Text } from "@fluentui/react-components";
import { useState } from "react";
import { PeriodPhraseItem } from "./period-phrase-item";

export const PeriodPhraseList = () => {
  const [preparation, setPreparation] = useState({
    num: "1",
    type: "week",
    format:
      "{{contractPeriodPhrase.preparation.num}} {{contractPeriodPhrase.preparation.type}} for preparation of approval drawings.",
  });

  const [approval, setApproval] = useState({
    num: "1",
    type: "week",
    format:
      "{{contractPeriodPhrase.approval.num}} {{contractPeriodPhrase.approval.type}} allocation for customer's (Party A) approval.",
  });

  const [shopDrawing, setShopDrawing] = useState({
    num: "1",
    type: "week",
    format:
      "{{contractPeriodPhrase.shopDrawing.num}} {{contractPeriodPhrase.shopDrawing.type}} for preparation of shop drawings.",
  });

  const [fabrication, setFabrication] = useState({
    num: "4",
    type: "weeks",
    format:
      "{{contractPeriodPhrase.fabrication.num}} {{contractPeriodPhrase.fabrication.type}} fabrication period reckoned from the date the approval drawings are approved.",
  });

  const [transportation, setTransportation] = useState({
    num: "4",
    type: "weeks",
    format:
      "{{contractPeriodPhrase.transportation.num}} {{contractPeriodPhrase.transportation.type}} for transportation from factory to {{transportationLocation}}",
  });

  return (
    <div>
      <Text size={400} weight="semibold">
        CONTRACT PERIOD PHRASE
      </Text>
      <br />
      <PeriodPhraseItem
        phrase="Preparation"
        values={preparation}
        onChange={setPreparation}
      />
      <br />
      <PeriodPhraseItem
        phrase="Approval"
        values={approval}
        onChange={setApproval}
      />
      <br />
      <PeriodPhraseItem
        phrase="Shop Drawing"
        values={shopDrawing}
        onChange={setShopDrawing}
      />
      <br />
      <PeriodPhraseItem
        phrase="Fabrication"
        values={fabrication}
        onChange={setFabrication}
      />
      <br />
      <PeriodPhraseItem
        phrase="Transportation"
        values={transportation}
        onChange={setTransportation}
      />
    </div>
  );
};
