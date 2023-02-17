import ErrorCard from '@nightlight/components/map/ErrorCard';
import { TestingLabel } from '@nightlight/src/types';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('Component <ErrorCard />', () => {
  test('it should have a functioning close button', () => {
    // create a mock onClose function
    const mockOnClose = jest.fn();

    // render the component
    render(<ErrorCard onClose={mockOnClose} />);

    // get the pressable (throw error if no exist)
    const pressable = screen.getByLabelText(TestingLabel.CloseButton);

    // click on the pressable
    fireEvent(pressable, 'press');

    // expect mockOnClose called once when pressed
    expect(mockOnClose.mock.calls).toHaveLength(1);
  });

  test('it should render the right message', () => {
    // render the component
    render(
      <ErrorCard message='ChatGPT is going to take my job' onClose={() => {}} />
    );

    // get the text (throw error if no exist)
    screen.getByText('ChatGPT is going to take my job');
  });
});
