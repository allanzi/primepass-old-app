import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useCreditResumeLazyQuery } from './graphql/hooks';
import {
  CreditResumeQueryVariables,
} from '../@types/graphql/operations';
import { Period } from '../@types/graphql/schemas';

interface CreditResumeContextData {
  loading: boolean;
  hasFetched: boolean;
  refetch: any;
  creditPlansAmount: number;
  creditVoucherAmount: number;
  creditPlans: Period[];
  creditVoucher: Period[];
  loadCreditResume(params:CreditResumeQueryVariables) : void;
  error: any;
  setHasFetched: Dispatch<SetStateAction<boolean>>;
}

const CreditResumeContext = createContext<CreditResumeContextData>({} as CreditResumeContextData);

const CreditResumeProvider: React.FC = ({ children }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [creditPlans, setCreditPlans] = useState<Period[]>([]);
  const [creditVoucher, setCreditVoucher] = useState<Period[]>([]);
  const [creditPlansAmount, setCreditPlansAmount] = useState(0);
  const [creditVoucherAmount, setCreditVoucherAmount] = useState(0);

  const [getCreditResume, {
    data, refetch, error, loading,
  }] = useCreditResumeLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      let plansCreditCount = 0;
      let voucherCreditCount = 0;

      const creditPlansData = [] as Period[];
      const creditVoucherData = [] as Period[];

      data?.user_credit_resume_list?.map((credit) => credit?.periods.map((period: any) => {
        const creditFormatted = {
          ...period, screen: credit.screen, room: credit.room, day: credit.day,
        };
        if (period.fromPlan) {
          plansCreditCount += period?.availableCredits;
          creditPlansData.push(creditFormatted);
          return period;
        }
        voucherCreditCount += period?.availableCredits;
        creditVoucherData.push(creditFormatted);
        return period;
      }));

      setCreditPlansAmount(plansCreditCount);
      setCreditVoucherAmount(voucherCreditCount);

      setCreditPlans(creditPlansData);
      setCreditVoucher(creditVoucherData);

      setHasFetched(true);
    },
  });

  useEffect(() => {
    if (!hasFetched) {
      setCreditPlansAmount(0);
      setCreditVoucherAmount(0);

      setCreditPlans([]);
      setCreditVoucher([]);
    }
  }, [hasFetched, setHasFetched]);

  const loadCreditResume = useCallback(async ({
    user_id,
  } : CreditResumeQueryVariables) => {
    await getCreditResume({
      variables: {
        user_id,
      },
    });
  }, []);

  return (
    <CreditResumeContext.Provider value={{
      creditPlans,
      creditVoucher,
      creditPlansAmount,
      creditVoucherAmount,
      loading,
      refetch,
      loadCreditResume,
      error,
      hasFetched,
      setHasFetched,
    }}
    >
      {children}
    </CreditResumeContext.Provider>
  );
};

function useCreditResume(): CreditResumeContextData {
  const context = useContext(CreditResumeContext);
  if (!context) {
    throw new Error('creditResume is required');
  }
  return context;
}

export { CreditResumeProvider, useCreditResume };
