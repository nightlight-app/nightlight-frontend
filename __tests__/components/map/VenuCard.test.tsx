import VenueCard from '@nightlight/components/map/VenueCard';
import { Location, User, Venue } from '@nightlight/src/types';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('<VenueCard />', () => {
  // create some dummy data
  const venueName = 'Chipotle';
  const address = '400, 21st Ave S, Nashville, TN';
  const location: Location = {
    latitude: 36.14728407270292,
    longitude: -86.79887047447323,
  };
  const dummyVenue: Venue = {
    _id: '',
    name: venueName,
    address,
    location,
    reactions: {
      '⚠️': { count: 1, didReact: true },
      '🎉': { count: 1, didReact: true },
      '💩': { count: 1, didReact: true },
      '🔥': { count: 1, didReact: true },
      '🛡️': { count: 1, didReact: true },
    },
  };

  test('it should have a functioning close button', () => {
    // create a mock onClose function
    const mockOnClose = jest.fn();

    // render the component
    render(<VenueCard venue={dummyVenue} onClose={mockOnClose} />);

    // get the pressable (throw error if no exist)
    const pressable = screen.getByLabelText('CloseButton');

    // click on the pressable
    fireEvent(pressable, 'press');

    // expect mockOnClose called once when pressed
    expect(mockOnClose.mock.calls).toHaveLength(1);
  });

  test('it should not render any children component', () => {
    // render the component
    render(
      <VenueCard venue={dummyVenue} onClose={() => {}}>
        <Text>Hello</Text>
      </VenueCard>
    );

    // query for the childrne
    const children = screen.queryByText('Hello');

    // expect children to not exist
    expect(children).toBeNull();
  });

  test('it should render the info of the venue', () => {
    // render the component
    render(<VenueCard venue={dummyVenue} onClose={() => {}} />);

    // get venue name (throw error if no exist)
    screen.getByText(venueName);

    // get adderss (throw error if no exist)
    screen.getByText(address);
  });

  test('it should have functioning GO buttons', () => {
    // TODO: this is only to temporary mock alert() -- remove later
    global.alert = jest.fn();

    // TODO: add mocks here

    // render component
    render(<VenueCard venue={dummyVenue} onClose={() => {}} />);

    // get the pressables (throw error if no exist)
    const press1 = screen.getByLabelText('VenueCardStartNavigation');

    // click on the pressables
    fireEvent(press1, 'press');

    // TODO: test what happens when GO is pressed
  });

  test('it should have a functioning emoji reaction', () => {
    // TODO: implement test for emoji reaction here
  });
});
