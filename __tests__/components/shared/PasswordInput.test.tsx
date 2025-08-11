import { fireEvent, render, screen } from '@testing-library/react';
import PasswordInput from '@/components/shared/PasswordInput';

describe('PasswordInput', () => {
  test('should toggle visibility after clicking on button ', () => {
    render(<PasswordInput />);
    const input = screen.getByPlaceholderText('••••••••');
    const button = screen.getByRole('button');

    // initial state should be password type
    expect(input).toHaveAttribute('type', 'password');

    // first click should change type to text
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');

    // second click should change type back to password
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
  });
});
