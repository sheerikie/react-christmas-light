import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// test("Test theme button toggle", () => {
//   render(<App />);
//   const buttonEl = screen.getByText(/Current theme/i);
    
//   userEvent.click(buttonEl);
//   expect(buttonEl).toHaveTextContent(/dark/i);
// });
it('test the play button for animation', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.play'));
  expect(logSpy).toHaveBeenCalledWith('onAnimationEnd called');
});

it('test the play button for animation', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.stop'));
  expect(logSpy).toHaveBeenCalledWith('onAnimationEnd stopped');
});
it('test add bulb', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.add'));
  expect(logSpy).toHaveBeenCalledWith('bulb added');
});
it('test remove bulb', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.remove'));
  expect(logSpy).toHaveBeenCalledWith('bulb removed');
});
it('test handle size change', () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector('.size'), {target: {value: '23'}})
  expect(container.querySelector('.size').value).toBe('23')
});
it('test handle size function call', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.size'));
  expect(logSpy).toHaveBeenCalledWith('size updated');
});
it('test handle lines change', () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector('.line'), {target: {value: '23'}})
  expect(container.querySelector('.line').value).toBe('23')
});
it('test handle line function call', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.line'));
  expect(logSpy).toHaveBeenCalledWith('line updated');
});
it('test turn bulb off function call', () => {
  const logSpy = jest.spyOn(console, 'log');
  const { container } = render(<App />);
  fireEvent.click(container.querySelector('.line'));
  expect(logSpy).toHaveBeenCalledWith('bulb switched');
});