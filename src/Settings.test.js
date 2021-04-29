import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Settings from './Settings';

const setupHost = () => {
  const result = render(<Settings userData={{ name: 'Dan Smith', img: '', email: 'ds@abc.com' }} isLogged={() => false} playerType={'host'}/>);
  return {
    ...result,
  };
};

const setupPlayer = () => {
  const result = render(<Settings userData={{ name: 'Jane Doe', img: '', email: 'jd@abc.com' }} isLogged={() => false} playerType={'player'}/>);
  return {
    ...result,
  };
};

test('Check that host settings component rendered correctly', () => {
  setupHost();
  const difficultyComponent = screen.getByText('Any Difficulty');
  expect(difficultyComponent).toBeInTheDocument();

  const categoryComponent = screen.getByText('Any Category');
  expect(categoryComponent).toBeInTheDocument();

  const PlayGameComponent = screen.getByText('Play Game');
  expect(PlayGameComponent).toBeInTheDocument();
});

test('Check that player settings component rendered correctly', () => {
  setupPlayer();
  const waitingForHostIndicator = screen.getByText('Host is selecting game settings...');
  expect(waitingForHostIndicator).toBeInTheDocument();
});

test('Check that dropdown menu contains values for difficulty', () => {
  setupHost();
  const difficultyComponent = screen.getByText('Any Difficulty');
  expect(difficultyComponent).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('difficulty'), {
    target: { value: 'Easy' },
  });

  const easy = screen.getByText('Easy');
  expect(easy).toBeInTheDocument();
});

test('Users first name appears on screen', () => {
  setupHost();
  const categoryComponent = screen.getByText('Any Category');
  expect(categoryComponent).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('category'), {
    target: { value: 'General Knowledge' },
  });

  const GeneralKnowledgeOption = screen.getByText('General Knowledge');
  expect(GeneralKnowledgeOption).toBeInTheDocument();
});

