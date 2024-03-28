import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {FontAwesome5} from '@expo/vector-icons';

interface SearchBarProps {
  showSearchBar: boolean;
  setShowSearchBar: Dispatch<SetStateAction<boolean>>;
  handleDebounce: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showSearchBar,
  setShowSearchBar,
  handleDebounce,
}) => {
  return (
    <View
      className={`flex-row justify-end items-center rounded-full ${
        Platform.OS == 'android' ? 'mt-4 ' : ''
      } ${showSearchBar ? 'bg-slate-300' : ''}`}>
      {showSearchBar ? (
        <TextInput
          onChangeText={handleDebounce}
          placeholder="Search City"
          placeholderTextColor={'white'}
          className="h-12 pl-4 text-xl pb-1 flex-1"
        />
      ) : null}

      <TouchableOpacity
        onPress={() => {
          setShowSearchBar(!showSearchBar);
        }}
        className="p-3 rounded-full m-1 bg-slate-400">
        <FontAwesome5 name="search-location" size={24} color={'#FFFFFF'} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
