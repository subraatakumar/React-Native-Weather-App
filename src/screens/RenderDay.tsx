import removeStartingDoubleSlash from '@/helpers/removeStartingDoubleSlash';
import {ForecastDay} from '@/types/WeatherData';
import {Image, Text, View} from 'react-native';

type RenderImageProp = {
  item: ForecastDay;
};

const RenderImage: React.FC<RenderImageProp> = ({item}) => {
  console.log('Image: ', item?.day?.condition?.text);
  let date = new Date(item.date);
  let options: Intl.DateTimeFormatOptions = {weekday: 'long'};
  let dayName = date.toLocaleDateString('en-US', options);
  //if (index == 0) return null;
  return (
    <View
      key={'' + item?.date_epoch}
      className=" w-32 rounded-3xl py-4 px-5 ml-3 bg-slate-400">
      <Text className="text-slate-300 font-semibold text-center py-1">
        {dayName}
      </Text>
      <Image
        source={{
          uri:
            'https://' +
            removeStartingDoubleSlash(item?.day?.condition?.icon || ''),
        }}
        className="w-20 h-20 self-center"
      />
      <Text className="text-slate-300 font-semibold text-center py-1">
        {item?.day?.condition?.text
          ? '(' + item?.day?.condition?.text + ')'
          : ''}
      </Text>
      <Text className="text-white font-semibold text-lg text-center">
        {item?.day?.avgtemp_c}&#176;
      </Text>
    </View>
  );
};

export default RenderImage;
