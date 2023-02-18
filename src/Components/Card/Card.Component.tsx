import React from 'react';
import { Image, Text, View } from 'react-native';

const CardComponent = ({
  avatar_url,
  name,
  stargazers_count,
  description,
  language,
}: any) => {
  return (
    <>
      <View
        style={{
          marginHorizontal: 24,
          marginVertical: 8,
          backgroundColor: '#FCFCFC',
          borderRadius: 18,
        }}>
        <View style={{margin: 8}}>
          <Image
            resizeMode="cover"
            source={{uri: avatar_url}}
            style={{
              alignSelf: 'center',
              backgroundColor: '#E7F4FF',
              width: 100,
              height: 100,
              justifyContent: 'center',
              borderRadius: 12,
              padding: 10,
              marginBottom: 8,
            }}
          />

          <Text>Repo Name: {name || 'Not found'}</Text>
          <Text>Star Count: {stargazers_count || 'Not found'} </Text>
          <Text>Description: {description || 'Not found'} </Text>
          <Text>Languages: {language || 'Not found'} </Text>
        </View>
      </View>
  
    </>
  );
};

export default CardComponent;
