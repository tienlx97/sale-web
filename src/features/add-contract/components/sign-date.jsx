import { Field, Input, makeStyles, Text } from "@fluentui/react-components";
import { useState } from "react";
import { DateComp } from "../../../coponents/date-comp";

const useStyles = makeStyles({
  rowFlex: {
    display: "flex",
    alignItems: "flex-end",
    gap: "1rem",
  },
});

export const SignedDate = () => {
  const _styles = useStyles();

  const [signDate, setSignDate] = useState(new Date());

  return (
    <div>
      <Text size={400} weight="semibold">
        SIGNED DATE
      </Text>
      <div className={_styles.rowFlex}>
        <Field style={{ width: "70%" }} label="Text" size="small">
          <Input placeholder="Ex: 18th day of September 2025" size="small" />
        </Field>
        <Field style={{ width: "30%" }} label="Date" size="small">
          <DateComp type="long" value={signDate} onChange={setSignDate} />
        </Field>
      </div>
    </div>
  );
};
