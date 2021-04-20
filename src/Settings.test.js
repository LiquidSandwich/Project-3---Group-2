import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Settings from './Settings';

const setup = () => {
  const result = render(<Settings userData={{ name: 'Dan Smith', img: '' }} isLogged={false} />);
  return {
    ...result,
  };
};

test('Check that component rendered correctly', () => {
  setup();
  const difficultyComponent = screen.getByText('Any Difficulty');
  expect(difficultyComponent).toBeInTheDocument();

  const categoryComponent = screen.getByText('Any Category');
  expect(categoryComponent).toBeInTheDocument();

  const PlayGameComponent = screen.getByText('Play Game');
  expect(PlayGameComponent).toBeInTheDocument();
});

test('Check that dropdown menu contains values for difficulty', () => {
  setup();
  const difficultyComponent = screen.getByText('Any Difficulty');
  expect(difficultyComponent).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('difficulty'), {
    target: { value: 'Easy' },
  });

  const easy = screen.getByText('Easy');
  expect(easy).toBeInTheDocument();
});

test('Users first name appears on screen', () => {
  setup();
  const categoryComponent = screen.getByText('Any Category');
  expect(categoryComponent).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('category'), {
    target: { value: 'General Knowledge' },
  });

  const GeneralKnowledgeOption = screen.getByText('General Knowledge');
  expect(GeneralKnowledgeOption).toBeInTheDocument();
});
