import React from 'react';
import {Image, Text, View} from 'react-native';
import Styles from './Card.Component.style';
import LOCALES from '../../Constants/index';

const CONSTANTS = LOCALES.cardComponentContants;

const CardComponent = ({
  avatar_url,
  name,
  stargazers_count,
  description,
  language,
}: any) => {
  return (
    <>
      <View style={Styles.mainContainer}>
        <View style={Styles.subContainer}>
          <Image
            resizeMode="cover"
            source={{uri: avatar_url}}
            style={Styles.imageContainer}
          />
          <View style={Styles.dataContainerView}>
            <View style={Styles.textContainerView}>
              <Text style={Styles.textTitleKey}>{CONSTANTS.repoName}</Text>
              <Text style={[Styles.textTitleValue, !name && Styles.notFound]}>
                {name || CONSTANTS.defaultNotFount}
              </Text>
            </View>

            <View style={Styles.textContainerView}>
              <Text style={Styles.textTitleKey}>{CONSTANTS.starCount}</Text>
              <Text
                style={[
                  Styles.textTitleValue,
                  !stargazers_count && Styles.notFound,
                ]}>
                {stargazers_count || CONSTANTS.defaultNotFount}
              </Text>
            </View>

            <View style={Styles.textContainerView}>
              <Text style={Styles.textTitleKey}>{CONSTANTS.description}</Text>
              <Text
                style={[
                  Styles.textTitleValue,
                  !description && Styles.notFound,
                ]}>
                {description || CONSTANTS.defaultNotFount}
              </Text>
            </View>

            <View style={Styles.textContainerView}>
              <Text style={Styles.textTitleKey}>{CONSTANTS.languages}</Text>
              <Text
                style={[Styles.textTitleValue, !language && Styles.notFound]}>
                {language || CONSTANTS.defaultNotFount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CardComponent;
