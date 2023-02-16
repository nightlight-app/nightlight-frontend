import MapCard from '@nightlight/components/map/MapCard';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('<MapCard />', () => {
  test('it should have a functioning close button', () => {
    // create a mock onClose function
    const mockOnClose = jest.fn();

    // render the component
    render(<MapCard onClose={mockOnClose} />);

    // get the pressable (throw error if no exist)
    const pressable = screen.getByLabelText('CloseButton');

    // click on the pressable
    fireEvent(pressable, 'press');

    // expect mockOnClose called once when pressed
    expect(mockOnClose.mock.calls).toHaveLength(1);
  });

  test('it should render the children component', () => {
    // render the component
    render(
      <MapCard onClose={() => {}}>
        <Text>Hello</Text>
      </MapCard>
    );

    // get the text (throw error if no exist)
    screen.getByText('Hello');
  });
});
