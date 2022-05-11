import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Circle from './Circle';
import handleCircleColorClick from './Circle';
import App from './App';

jest.mock('./Circle', () => jest.fn());

describe('test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Circle />, div);
    ReactDOM.unmountComponentAtNode(div);
  });



  it('allows Jest method mocking 2', () => {
    const logSpy = jest.spyOn(console, 'log');
    handleCircleColorClick.mockImplementation(() => 2);
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('.circle__color'));
    expect(logSpy).toHaveBeenCalledWith('circle clicked');
  });
});

// it('test handle circle click', () => {
//   const logSpy = jest.spyOn(console, 'log');
//   const { container } = render(<Circle />);
//   fireEvent.click(container.querySelector(' .circle'));
//   expect(logSpy).toHaveBeenCalledWith('circle clicked');
// });
