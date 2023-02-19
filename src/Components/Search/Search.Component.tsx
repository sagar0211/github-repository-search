import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import CardComponent from '../Card/Card.Component';
import Styles from './Search.Component.styles';
import LOCALES from '../../Constants';

const CONSTANTS = LOCALES.searchComponentConstants;

export const SearchComponent = () => {
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selected, setSelected] = useState();
  const [order, setOrder] = useState('desc');
  const [sortPressed, setSortPressed] = useState(false);
  let per_page_value = 10;

  const fetchRepos = async (
    searchedText: string,
    pageNumber: number,
    selected?: string,
    order?: string,
  ) => {
    setIsLoading(true);
    let url = `https://api.github.com/search/repositories?q=${searchedText}&page=${pageNumber}&per_page=${per_page_value}&sort=${selected}&order=${order}`;
    await axios
      .get(url)
      .then(response => {
        setRepoData(response.data.items);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  const sortByData = [
    {key: 'stars', value: 'Stars'},
    {key: 'watchers', value: 'Watchers'},
    {key: 'score', value: 'Score'},
    {key: 'created_at', value: 'Created at'},
    {key: 'updated_at', value: 'Updated at'},
  ];

  const orderByData = [
    {key: 'asc', value: 'Ascending'},
    {key: 'desc', value: 'Descending'},
  ];

  const sortUI = () => {
    return (
      <>
        <View style={Styles.sortUiMainContainerView}>
          <View style={Styles.sortUiSubContainerView}>
            <Text style={Styles.sortTitleText}>{CONSTANTS.sortByTitle}</Text>
            <SelectList
              setSelected={val => setSelected(val)}
              data={sortByData}
              save="key"
              boxStyles={{backgroundColor: 'white'}}
              dropdownStyles={Styles.sortDropdownStyle}
              defaultOption={{key: 'stars', value: 'Stars'}}
              search={false}
            />
          </View>
          <View style={Styles.sortUiSubContainerView}>
            <Text style={Styles.sortTitleText}>{CONSTANTS.orderByTitle}</Text>
            <SelectList
              setSelected={val => setOrder(val)}
              data={orderByData}
              save="key"
              boxStyles={{backgroundColor: 'white'}}
              dropdownStyles={Styles.sortDropdownStyle}
              defaultOption={{key: 'desc', value: 'Descending'}}
              search={false}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={Styles.mainContainer}>
        <TextInput
          maxLength={15}
          value={searchedText}
          style={Styles.textInputContainer}
          placeholder="Search..."
          placeholderTextColor={'#B6B6B6'}
          onChangeText={(text: any) => setSearchedText(text)}
        />
      </View>
      {sortPressed && sortUI()}
      <View style={Styles.buttonContainerView}>
        <TouchableOpacity
          style={[
            Styles.buttonCommonStyle,
            {
              backgroundColor: '#4B7AFB',
              opacity: searchedText.length > 0 ? 1 : 0.6,
            },
          ]}
          disabled={searchedText?.length > 0 ? false : true}
          onPress={async () => {
            await Keyboard.dismiss();
            await setSortPressed(true);
          }}>
          <Text style={Styles.buttonTextStyle}>{CONSTANTS.sortButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.buttonCommonStyle,
            {
              backgroundColor: '#6e40c9',
              opacity: searchedText.length > 0 ? 1 : 0.6,
            },
          ]}
          disabled={searchedText?.length > 0 ? false : true}
          onPress={async () => {
            await Keyboard.dismiss();
            await setPageNumber(1);
            await fetchRepos(searchedText, pageNumber, selected, order);
          }}>
          <Text style={Styles.buttonTextStyle}>
            {CONSTANTS.searchButtonText}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isLoading ? (
          <View>
            <ActivityIndicator color={'#FFFFFF'} size={'large'} />
          </View>
        ) : (
          repoData.map((repo: any, index: number) => (
            <CardComponent
              key={index}
              avatar_url={repo.owner.avatar_url}
              name={repo.name}
              stargazers_count={repo.stargazers_count}
              description={repo.description}
              language={repo.language}
            />
          ))
        )}
        {!isLoading && repoData.length > per_page_value - 1 && (
          <View style={Styles.paginationMainContainerView}>
            <View style={Styles.paginationSubContainerView}>
              {pageNumber > 1 && (
                <TouchableOpacity
                  onPress={async () => {
                    await setPageNumber(pageNumber - 1);
                    await fetchRepos(searchedText, pageNumber, selected, order);
                  }}>
                  <Text style={Styles.paginationTextStyle}>
                    {CONSTANTS.backArrow}
                  </Text>
                </TouchableOpacity>
              )}

              <Text style={Styles.paginationTextStyle}>{pageNumber}</Text>
              <TouchableOpacity
                onPress={async () => {
                  await setPageNumber(pageNumber + 1);
                  await fetchRepos(searchedText, pageNumber, selected, order);
                }}>
                <Text style={Styles.paginationTextStyle}>
                  {CONSTANTS.frontArrow}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};
