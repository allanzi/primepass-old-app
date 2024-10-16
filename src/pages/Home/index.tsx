import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useFocusEffect, useNavigation, CommonActions } from '@react-navigation/native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Animated, Platform } from 'react-native';

import { isNetworkConnectionError } from '../../utils/graphqlErrors';
import { useAction } from '../../hooks/actions';
import { useAuth } from '../../hooks/auth';
import { useCreditResume } from '../../hooks/creditResume';
import { useLocation } from '../../hooks/location';
import { useTransactionsHistory } from '../../hooks/transactionsHistory';
import { useSetupQuery } from '../../hooks/graphql/hooks';
import AnimatedScrollView from '../../components/AnimatedScrollView';
import Api from '../../services/api';
import CheckInModal from '../../components/CheckInModal';
import Credits from './components/Credits';
import HeaderApp from '../../components/HeaderApp';
import Header from './components/Header';
import Plans from './components/Plans';
import Services from './components/Services';
import Wallet from './components/Wallet';
import * as S from './styles';

const Home: React.FC = () => {
  const { geoLocation } = useLocation();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(1)).current;
  const { user, signOut } = useAuth();
  const { logEvent } = useAction();

  const [visibleCheckIn, setVisibleCheckIn] = useState(false);

  const {
    data,
    loading: transactionLoading,
    loadTransactionsHistory,
  } = useTransactionsHistory();

  const verifyStatusLogin = async () => {
    try {
      const { data: { data: verify } } = await Api.get('users/login/status');

      if (verify.must_reauth) {
        navigation.dispatch(CommonActions.navigate('Welcome'));
        navigation.navigate('Login', {
          screen: 'Welcome',
        });
        await signOut();
      }
    // eslint-disable-next-line no-empty
    } catch (err) {
    }
  };

  useEffect(() => {
    geoLocation({ ok: true });
  }, []);

  const [showWallet, setShowWallet] = useState(false);
  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'home-app',
    },
  });

  useEffect(() => {
    const setupWallet = dataSetup?.setup_list?.setups?.filter(
      (setup) => setup?.category?.name === 'wallet',
    );
    if (setupWallet && setupWallet?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowWallet(Boolean(setupWallet[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  const {
    loadCreditResume, error: creditError,
  } = useCreditResume();

  useFocusEffect(
    useCallback(() => {
      if (user) {
        verifyStatusLogin();
        loadCreditResume({ user_id: user.id });
        loadTransactionsHistory({
          userId: user.id,
          id: undefined,
          status: undefined,
        });

        logEvent({
          type: 'log-screen',
          flow: 'app',
          group: 'scrn',
          context: 'home',
          section: 'page',
          description: 'Home',
          userId: user ? user.id : '0',
        });
      }

      return () => {
        setVisibleCheckIn(false);
      };
    }, [user]),
  );

  useEffect(() => {
    const transactionAuthorized = data.filter((transaction) => transaction?.status === 'authorized');

    if (
      transactionAuthorized
      && transactionAuthorized.length > 0
      && !transactionLoading
    ) {
      setVisibleCheckIn(true);
    }

    return () => {
      setVisibleCheckIn(false);
    };
  }, [data, transactionLoading]);

  useEffect(() => {
    if (creditError !== undefined) {
      if (isNetworkConnectionError(creditError)) {
        return navigation.navigate('ConnectionError');
      }

      return navigation.navigate('ServerError');
    }
  }, [creditError]);

  return (
    <AndroidBackHandler onBackPress={() => true}>
      <S.Container>
        {visibleCheckIn && (
          <CheckInModal
            transaction={data[0]}
            visible={visibleCheckIn}
            setVisible={setVisibleCheckIn}
          />
        )}

        <HeaderApp y={scrollY} />

        <AnimatedScrollView scrollY={scrollY}>
          <Header />
          {showWallet && <Wallet />}
          <Plans />
          <Credits />

          <S.TitleServices>Meus serviços</S.TitleServices>
          <S.ContentServices>
            <Services />
          </S.ContentServices>
        </AnimatedScrollView>
      </S.Container>
    </AndroidBackHandler>

  );
};

export default Home;
