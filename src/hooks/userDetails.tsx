import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import moment from 'moment';

import { useUserDetailsLazyQuery } from './graphql/hooks';
import {
  UserDetailsQueryVariables,
} from '../@types/graphql/operations';
import { UserSignaturePlan } from '../@types/graphql/schemas';

interface UserDetailsContextData {
  plansB2C: UserSignaturePlan[];
  plans: any[];
  getHasPlan(creditPlansAmount: number): void;
  hasPlan: boolean;
  setHasPlan: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  hasFetched: boolean;
  refetch: any;
  loadUserDetails(params: UserDetailsQueryVariables) : void;
  error: any;
  setHasFetched: Dispatch<SetStateAction<boolean>>;
}

const UserDetailsContext = createContext<UserDetailsContextData>({} as UserDetailsContextData);

const UserDetailsProvider: React.FC = ({ children }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [plansB2C, setPlansB2C] = useState<UserSignaturePlan[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const [historyList, { data, refetch, error }] = useUserDetailsLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      if (data?.user_details) {
        const { signatures } = data?.user_details;
        const core: any[] = [];
        const nonCore: any[] = [];
        const plansFiltered: UserSignaturePlan[] = [];

        signatures?.forEach((signature) => {
          if (signature?.isB2C === true) {
            signature?.plans?.map((plan: any) => {
              plansFiltered.push({ parentSignature: signature.parentSignature, ...plan });
              return plan;
            });
          }

          const transformed = signature?.plans?.map((plan) => ({
            ...plan,
            period: (Number(signature.parentSignature.duration) / 30) === 1 ? 'Mensal' : 'Anual',
            keyId: `${signature.id}:${plan?.id}`,
            expirationDate: moment(signature.dateFinish).format('DD/MM/YYYY'),
            ticketRenew: moment(signature.dateFinish).add(1, 'days').format('DD/MM/YYYY'),
            parentSignature: signature.parentSignature,
            isB2C: signature?.isB2C,
          }));
          [...Array.from(transformed)].forEach((plan) => {
            if (plan.isCore) {
              core.push(plan);
              return;
            }
            let modalContent = '';
            if (plan.services) {
              plan.services.forEach((service) => {
                modalContent += `<b>${service?.name}</b>
                <br>
                  ${service?.description?.description}
                <br>
                <br>`;
              });
            }
            nonCore.push({ ...plan, modalContent });
          });
        });

        setPlansB2C(plansFiltered);
        setPlans([...core, ...nonCore]);
        setLoading(false);
      }
      setHasFetched(true);
    },
  });

  const loadUserDetails = useCallback(async ({
    user_id,
    page,
    per_page,
    signature_type,
    active_page,
  } : UserDetailsQueryVariables) => {
    setLoading(true);
    historyList({
      variables: {
        user_id,
        page,
        per_page,
        signature_type,
        active_page,
      },
    });
  }, []);

  const getHasPlan = useCallback((creditPlansAmount: number) => {
    plansB2C.map((plan) => {
      if (!plan.parentSignature.dateCancel) {
        setHasPlan(true);
      }
      if (plan.parentSignature.dateCancel && creditPlansAmount > 0) {
        setHasPlan(true);
      }

      return plan;
    });
  }, [plansB2C]);

  useEffect(() => {
    if (!hasFetched) {
      setPlansB2C([]);
      setPlans([]);
    }
  }, [hasFetched, setHasFetched]);

  return (
    <UserDetailsContext.Provider value={{
      plansB2C,
      plans,
      getHasPlan,
      hasPlan,
      setHasPlan,
      loading,
      refetch,
      loadUserDetails,
      error,
      hasFetched,
      setHasFetched,
    }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

function useUserDetails(): UserDetailsContextData {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error('userDetails is required');
  }
  return context;
}

export { UserDetailsProvider, useUserDetails };
