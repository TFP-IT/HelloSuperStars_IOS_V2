import {ThemeContext} from '../Constants/context';
import colorCode from '../Constants/colorCode';
import {useContext} from 'react';

export const useThemeColor = () => {
  const {isDark, setIsDark} = useContext(ThemeContext);

  const themeCardColor = isDark
    ? {backgroundColor: colorCode.cardDark}
    : {backgroundColor: colorCode.cardLight};
  const themeTextColor = !isDark
    ? {color: colorCode.textColorDarkL}
    : {color: colorCode.textColorLight};

  const themeImgBgColor = !isDark
    ? {backgroundColor: colorCode.imgBgColorDark}
    : {backgroundColor: colorCode.imgBgColorLight};

  const themeBacground = isDark
    ? {backgroundColor: colorCode.ThemeDarkColor}
    : {backgroundColor: colorCode.ThemeWhitColor};
  const themeIconColor = !isDark
    ? colorCode.iconColorDark
    : colorCode.iconColorLight;
  const themeReadMoreColor = !isDark
    ? {color: 'blue'}
    : {color: colorCode.gold};
  const themeTransparentColor = !isDark
    ? {backgroundColor: colorCode.transparentGold}
    : {backgroundColor: colorCode.transparentBlackDark};

  return {
    themeCardColor,
    themeTextColor,
    themeBacground,
    themeIconColor,
    themeImgBgColor,
    themeReadMoreColor,
    themeTransparentColor,
  };
};
