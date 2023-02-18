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
import CardComponent from '../Card/Card.Component';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';

export const SearchComponent = (props: any) => {
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selected, setSelected] = useState();
  const [order, setOrder] = useState('asc');
  const [sortPressed, setSortPressed] = useState(false);
  const [dateValue, setDateValue] = useState('created_at');
  let per_page_value = 10;

  const fetchRepos = async (
    searchedText: string,
    pageNumber: number,
    selected?: string,
    order?: string,
  ) => {
    setIsLoading(true);
    let url = `https://api.github.com/search/repositories?q=${searchedText}&page=${pageNumber}&per_page=${per_page_value}&sort=${selected}&order=${order}`;
    console.log(url);
    await axios
      .get(url)
      .then(response => {
        console.log(response.data.items);
        setRepoData(response.data.items);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const sortByData = [
    {key: 'stars', value: 'Stars'},
    {key: 'watchers', value: 'Watchers'},
    {key: 'score', value: 'Score'},
    // {key: 'name', value: 'Name'},
  ];

  const orderByData = [
    {key: 'asc', value: 'Ascending'},
    {key: 'desc', value: 'Descending'},
  ];

  const date = [
    {key: 'created_at', value: 'Created at'},
    {key: 'updated_at', value: 'Updated at'},
  ];

  const sortUI = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <View style={{width: '50%', paddingBottom: 10,paddingLeft: 10,paddingRight: 10}}>
            {/* <Text style={{color: 'white', padding: 5}}>Sort by </Text> */}
            {/* <MultipleSelectList
              setSelected={(val: any) => setSelected(val)}
              data={sortByData}
              save="key"
              label="Sort by option"
              boxStyles={{backgroundColor: 'white', marginBottom: 12}}
              dropdownStyles={{backgroundColor: 'white', marginBottom: 12}}
              search={false}
            /> */}
            <Text style={{color: 'white', padding: 5}}>Sort by </Text>
            <SelectList
              setSelected={val => setSelected(val)}
              data={sortByData}
              save="key"
              boxStyles={{backgroundColor: 'white'}}
              dropdownStyles={{backgroundColor: 'white', marginBottom: 12}}
              defaultOption={{key: 'stars', value: 'Stars'}}
            />
          </View>
          <View style={{width: '50%', paddingBottom: 10,paddingLeft: 10,paddingRight: 10}}>
            <Text style={{color: 'white', padding: 5}}>Order BY</Text>
            <SelectList
              setSelected={val => setOrder(val)}
              data={orderByData}
              save="key"
              boxStyles={{backgroundColor: 'white', marginBottom: 12}}
              dropdownStyles={{backgroundColor: 'white', marginBottom: 12}}
              defaultOption={{key: 'asc', value: 'Ascending'}}
            />
            {/* <Text style={{color: 'white', padding: 5}}>Updated</Text>
            <SelectList
              setSelected={val => setDateValue(val)}
              data={date}
              save="key"
              boxStyles={{backgroundColor: 'white'}}
              dropdownStyles={{backgroundColor: 'white', marginBottom: 12}}
              defaultOption={{key: 'created_at', value: 'Created at'}}
            /> */}
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: '100%',
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#222222',
          margin: 24,
          backgroundColor: '#FFFFFF',
          padding: 2,
        }}>
        <TextInput
          maxLength={15}
          autoFocus
          value={searchedText}
          style={{color: '#222222', fontSize: 16, fontWeight: '500'}}
          placeholder="Search..."
          placeholderTextColor={'#B6B6B6'}
          onChangeText={(text: any) => setSearchedText(text)}
        />
      </View>
      {sortPressed && sortUI()}
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: '#1B1091',
            width: 120,
            height: 40,
            borderRadius: 8,
            borderColor: '#222222',
            borderWidth: 1,
            marginBottom: 12,
            opacity: searchedText.length > 0 ? 1 : 0.6,
          }}
          disabled={searchedText?.length > 0 ? false : true}
          onPress={async () => {
            setSortPressed(true);
          }}>
          <Text
            style={{
              padding: 8,
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}>
            Sort
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: '#6e40c9',
            width: 120,
            height: 40,
            borderRadius: 8,
            borderColor: '#222222',
            borderWidth: 1,

            marginBottom: 12,
            opacity: searchedText.length > 0 ? 1 : 0.6,
          }}
          disabled={searchedText?.length > 0 ? false : true}
          onPress={async () => {
            await Keyboard.dismiss();
            await setPageNumber(1);
            await fetchRepos(searchedText, pageNumber, selected, order);
          }}>
          <Text
            style={{
              padding: 8,
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}>
            Search
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
          <View
            style={{
              alignSelf: 'flex-end',
              borderRadius: 14,
              borderColor: '#222222',
              margin: 12,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={async () => {
                  await setPageNumber(pageNumber - 1);
                  await fetchRepos(searchedText, pageNumber, selected, order);
                }}>
                <Text
                  style={{
                    padding: 4,
                    fontSize: 18,
                    margin: 5,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                  {'<'}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  padding: 4,
                  fontSize: 18,
                  margin: 5,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}>
                {pageNumber}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await setPageNumber(pageNumber + 1);
                  await fetchRepos(searchedText, pageNumber, selected, order);
                }}>
                <Text
                  style={{
                    padding: 4,
                    fontSize: 18,
                    margin: 5,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                  {'>'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};
