import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameMode from './GameMode';

const setup = () => {
  const result = render(<GameMode userData={{ name: 'Dan Smith', img: '' }} />);
  return {
    ...result,
  };
};

test('Check that component rendered correctly', () => {
  setup();

  const frontPage = screen.getByText('nogginy');
  expect(frontPage).toBeInTheDocument();

  const singleButton = screen.getByText('Single');
  expect(singleButton).toBeInTheDocument();

  const LogOutButton = screen.getByText('Log out');
  expect(LogOutButton).toBeInTheDocument();
});

test('Clicking single works', () => {
  setup();

  const singleButton = screen.getByText('Single');
  expect(singleButton).toBeInTheDocument();

  fireEvent.click(singleButton);
  expect(singleButton).not.toBeInTheDocument();

  const nextPage = screen.getByText('Any Difficulty');
  expect(nextPage).toBeInTheDocument();
});

test('Users first name appears on screen', () => {
  setup();

  const mainDisplay = screen.getByText('Welcome Back, Dan!');
  expect(mainDisplay).toBeInTheDocument();

  render(<GameMode userData={{ name: 'DanSmith', img: '' }} />);

  const testDisplay = screen.getByText('Welcome Back, DanSmith!');
  expect(testDisplay).toBeInTheDocument();
});
