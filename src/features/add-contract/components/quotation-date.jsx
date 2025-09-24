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

export const QuotationDate = () => {
  const _styles = useStyles();

  const [quotationDate, setQuotationDatee] = useState(new Date());

  return (
    <div>
      <Text size={400} weight="semibold">
        QUOTATION DATE
      </Text>
      <div className={_styles.rowFlex}>
        <Field style={{ width: "70%" }} label="Text" size="small">
          <Input placeholder="Ex: 18th September 2025" size="small" />
        </Field>
        <Field style={{ width: "30%" }} label="Date" size="small">
          <DateComp
            type="dd/mm/yyyy"
            value={quotationDate}
            onChange={setQuotationDatee}
          />
        </Field>
      </div>
    </div>
  );
};
