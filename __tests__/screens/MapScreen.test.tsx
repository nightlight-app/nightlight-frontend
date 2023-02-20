import { MapCardType } from '@nightlight/src/types';
import { capitalizeFirstLetter } from '@nightlight/src/utils/utils';
import { screen } from '@testing-library/react-native';

describe('MapScreen', () => {
  // Get the list of available Cards (e.g. VenueCard, UserCard, ErrorCard)
  const availableCards = Object.keys(MapCardType).map(
    card => `${capitalizeFirstLetter(card)}Card`
  );

  test.each(availableCards)(
    'it should open and close <%s /> correctly',
    card => {
      // TODO:
      // 1. get the pressable that opens the respective cards
      // 2. test that the card is opened
      // 3. find the close button
      // 4. test that the card is closed
    }
  );
});
