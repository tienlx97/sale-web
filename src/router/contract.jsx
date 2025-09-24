import { Divider, makeStyles } from "@fluentui/react-components";
import { ConstractInformation } from "../features/add-contract/components/contract-information";
import { Parties } from "../features/add-contract/components/parties";
import { Payments } from "../features/add-contract/components/payment";
import { PeriodPhraseList } from "../features/add-contract/components/period-phrase-list";
import { QuotationDate } from "../features/add-contract/components/quotation-date";
import { SignedDate } from "../features/add-contract/components/sign-date";

const useStyles = makeStyles({
  root: {
    maxWidth: "800px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  rowFlex: {
    display: "flex",
    alignItems: "flex-end",
    gap: "1rem",
  },

  fullWidth: {
    width: "100%",
  },
});

export const ContractPage = () => {
  const _styles = useStyles();

  return (
    <div>
      <div className={_styles.root}>
        <SignedDate />
        <Divider appearance="strong" />
        <QuotationDate />
        <Divider appearance="strong" />
        <ConstractInformation />
        <Divider appearance="strong" />
        <Parties />
        <Divider appearance="strong" />
        <PeriodPhraseList />
        <Divider appearance="strong" />
        <Payments />
      </div>
    </div>
  );
};
