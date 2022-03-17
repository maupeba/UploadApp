import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import Upload from './index';

it('should call select file function', () => {
  const screen = render(<Upload />)

  const selectFileButton = screen.getByTestId('select-file');

  fireEvent.press(selectFileButton);

  expect(launchImageLibrary).toBeCalled();
})