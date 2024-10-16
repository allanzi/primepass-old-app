import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Linking, Platform } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { SITE } from '@env';
import { isNetworkConnectionError } from '../../../../utils/graphqlErrors';
import { useAuth } from '../../../../hooks/auth';
import { Signature, UserService } from '../../../../@types/graphql/schemas';
import { useUserServices } from '../../../../hooks/userServices';
import { useSetupQuery } from '../../../../hooks/graphql/hooks';
import BottomSheetServiceSignatures from '../../../../components/BottomSheetServiceSignatures';
import BottomSheetServiceRedeem from '../../../../components/BottomSheetServiceRedeem';
import ServiceCard from '../../../../components/ServiceCard';
import SkeletonServices from '../../../../components/Skeletons/SkeletonServices';
import * as S from './styles';

const Services: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    data, loading, loadUserServices, error, hasFetched,
  } = useUserServices();

  const [loadingList, setLoadingList] = useState(true);
  const [services, setServices] = useState([] as UserService[]);
  const [isModalServiceVisible, setModalServiceVisible] = useState(false);
  const [isModalRedeemVisible, setModalRedeemVisible] = useState(false);
  const [selectedService, setSelectedService] = useState({} as UserService);
  const [selectedSignature, setSelectedSignature] = useState({} as Signature);

  const [showButtonSite, setShowWallet] = useState(false);
  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'home-app',
    },
  });

  useEffect(() => {
    const setupButtonSite = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'abrir-site');
    if (setupButtonSite && setupButtonSite?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowWallet(Boolean(setupButtonSite[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadUserServices();
      }
    }, [user]),
  );

  useEffect(() => {
    if (error !== undefined) {
      if (isNetworkConnectionError(error)) {
        return navigation.navigate('ConnectionError');
      }

      return navigation.navigate('ServerError');
    }
  }, [error]);

  useEffect(() => {
    setLoadingList(true);
    if (data?.user_services?.services) {
      setServices(data?.user_services?.services);
    }
    setLoadingList(false);
  }, [data]);

  const handleOpenSite = useCallback(() => {
    Linking.openURL(`${SITE}/assinar-agora`);
  }, [SITE]);

  const toggleModalService = () => {
    setModalServiceVisible(!isModalServiceVisible);
  };

  const toggleModalRedeem = (service?: UserService, signature?: Signature) => {
    if (service && signature) {
      setSelectedSignature(signature);
      setSelectedService(service);
    }
    setModalRedeemVisible(!isModalRedeemVisible);
  };

  const selectService = (service: UserService) => {
    setSelectedService(service);
    toggleModalService();
  };

  return (
    <S.Fragment>
      {((loading || loadingList) && !hasFetched) ? (
        <S.ContainerLoading>
          <SkeletonServices />
        </S.ContainerLoading>
      ) : (
        <S.Container>

          <S.Service>
            <S.ServiceCardContainer>
              {services.length <= 0
                && (
                  <>
                    <S.ContainerEmpty>
                      <S.TextDisable>Nenhum serviço disponível</S.TextDisable>
                    </S.ContainerEmpty>

                    {showButtonSite
                      && (
                        <S.ContentActions>
                          <S.Button onPress={() => handleOpenSite}>
                            <S.ButtonText>
                              Ir para o site da Primepass
                            </S.ButtonText>
                          </S.Button>
                        </S.ContentActions>
                      )}
                  </>
                )}

              {services && services.map((item) => (
                <ServiceCard
                  key={item?.id}
                  background={item?.images?.card_web}
                  handleNavigateService={() => selectService(item)}
                  name={item.name}
                  serviceType={item.type}
                  logo={item?.images?.logo}
                />
              ))}

            </S.ServiceCardContainer>
          </S.Service>

        </S.Container>
      )}

      <BottomSheetServiceSignatures
        visible={isModalServiceVisible}
        toggle={toggleModalService}
        service={selectedService}
        openServiceRedeem={toggleModalRedeem}
      />
      <BottomSheetServiceRedeem
        visible={isModalRedeemVisible}
        toggle={toggleModalRedeem}
        service={selectedService}
        signature={selectedSignature}
      />
    </S.Fragment>
  );
};

export default Services;
