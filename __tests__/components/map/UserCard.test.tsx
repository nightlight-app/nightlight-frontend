import UserCard from '@nightlight/components/map/UserCard';
import { User } from '@nightlight/src/types';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('<UserCard />', () => {
  // create some dummy data
  const firstName = 'Graham';
  const lastName = 'Hemingway';
  const location = {
    longitude: 42,
    latitude: 42,
  };
  const phoneNumber = '615-555-5555';
  const dummyUser: User = {
    _id: '',
    firstName,
    lastName,
    lastActive: {
      location,
      time: new Date(),
    },
    phoneNumber,
  };

  test('it should have a functioning close button', () => {
    // create a mock onClose function
    const mockOnClose = jest.fn();

    // render the component
    render(<UserCard user={dummyUser} onClose={mockOnClose} />);

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
      <UserCard user={dummyUser} onClose={() => {}}>
        <Text>Hello</Text>
      </UserCard>
    );

    // query for the childrne
    const children = screen.queryByText('Hello');

    // expect children to not exist
    expect(children).toBeNull();
  });

  test('it should render the basic info of the user', () => {
    // render the component
    render(<UserCard user={dummyUser} onClose={() => {}} />);

    // getfor user's name (throw error if no exist)
    screen.getByText(firstName + ' ' + lastName);

    // get phone number (throw error if no exist)
    screen.getByText(phoneNumber);

    // get initials of user (throw error if no exist)
    screen.getByText(`${firstName[0]}${lastName[0]}`);
  });

  test('it should have functioning action buttons', () => {
    // TODO: this is only to temporary mock alert() -- remove later
    global.alert = jest.fn();

    // create mock variables
    let mockLocations: Location[] = [];

    // TODO: mock the necessary functions for testing pressables
    // (currently does not work)
    const mockHandleStartNavigation = jest.fn(location =>
      mockLocations.push(location)
    );
    const mockHandleCallUser = jest.fn();
    const mockHandlePingUser = jest.fn();

    // render component
    render(<UserCard user={dummyUser} onClose={() => {}} />);

    // get the pressables (throw error if no exist)
    const press1 = screen.getByLabelText('StartNavigation');
    const press2 = screen.getByLabelText('CallUser');
    const press3 = screen.getByLabelText('PingUser');

    // click on the pressables
    fireEvent(press1, 'press');
    fireEvent(press2, 'press');
    fireEvent(press3, 'press');

    // TODO: test what happens when each pressables are pressed
  });
});
