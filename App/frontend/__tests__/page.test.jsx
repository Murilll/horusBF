import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/components/Environment/Home/Tablee/Tablee'

describe('Home Page', () => {
  it('renders Home', () => {
    render(<Home />);

    // Assumindo que o RegisterTypeOfPlaceForm tem um elemento com o texto "Register Type Of Place"
    const formElement = screen.getByText('Register Type Of Place');

    expect(formElement).toBeInTheDocument();
  });
});
