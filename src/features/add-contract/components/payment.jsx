import {
  Field,
  Input,
  makeStyles,
  Text,
  Textarea,
} from "@fluentui/react-components";
import { useEditContext } from "../../../providers/edit-provider";

const useStyles = makeStyles({
  rowFlex: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    flexDirection: "row",
  },

  colFlex: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    flexDirection: "column",
  },

  full: {
    width: "100%",
  },
});

export const Payments = () => {
  const _styles = useStyles();

  const { editMode } = useEditContext();

  return (
    <div>
      <Text size={400} weight="semibold">
        PAYMENT
      </Text>

      <div>
        <Text size={400} weight="semibold">
          __Percent__
        </Text>
      </div>
      <div className={_styles.rowFlex}>
        <Field style={{ width: "30%" }} label="Num" size="small">
          <Input size="small" />
        </Field>
        <Field style={{ width: "70%" }} label="Text" size="small">
          <Input size="small" />
        </Field>
      </div>
      <br />
      <div className={_styles.rowFlex}>
        <Field style={{ width: "100%" }} label="Money Text" size="small">
          <Input size="small" />
        </Field>
      </div>

      <div className={_styles.rowFlex}>
        <Field style={{ width: "100%" }} label="Term" size="small">
          <Input size="small" />
        </Field>
      </div>
      <div>
        <Text size={400} weight="semibold">
          __Date__
        </Text>
      </div>
      <div className={_styles.rowFlex}>
        <Field style={{ width: "30%" }} label="Num" size="small">
          <Input size="small" />
        </Field>
        <Field style={{ width: "70%" }} label="Text" size="small">
          <Input size="small" />
        </Field>
      </div>
      <br />

      <Field className={_styles.full} label="paymentPercentText" size="small">
        <Textarea
          disabled={!editMode}
          value="First Payment: Party A shall pay {{contract.payment.[0].percent.text}} ({{contract.payment.[0].percent.num}}%) of the Contract Value"
        />
      </Field>
      <Field className={_styles.full} label="paymentValueText" size="small">
        <Textarea
          disabled={!editMode}
          value="{{contract.currencyUnit}} {{contractCurrencyFormat}} x {{contract.payment.[0].percent.num}}% = {{contract.money.unit}} {{firstPaymentValue}}"
        />
      </Field>
      <Field className={_styles.full} label="termext" size="small">
        <Textarea
          disabled={!editMode}
          value="by {{contract.payment.[0].term}} within {{contract.payment.[0].date.num}} ({{contract.payment.[0].date.text}}) calendar days from the date of Contract signing"
        />
      </Field>
      <Field className={_styles.full} label="endText" size="small">
        <Textarea
          disabled={!editMode}
          value="Receipt of this payment shall be a condition precedent for Party B to commence fabrication of the members, subject to Party A’s approval of the drawings."
        />
      </Field>
      <Field className={_styles.full} label="moneyTextInword" size="small">
        <Textarea
          disabled={!editMode}
          value="*(In words: {{contract.payment.[0].money.text}})*"
        />
      </Field>
    </div>
  );
};
