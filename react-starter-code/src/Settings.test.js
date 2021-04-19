import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import Settings from './Settings';

const setup = () => {
  const result = render(<Settings />);
  return {
    ...result,
  };
};

test('Check that component rendered correctly', () => {
  const { input } = setup();
  
  const difficultyComponent = screen.getByText("Any Difficulty");
  expect(difficultyComponent).toBeInTheDocument();
  
  const categoryComponent = screen.getByText("Any Category");
  expect(categoryComponent).toBeInTheDocument();
  
  const LogOutComponent = screen.getByText("Log out");
  expect(LogOutComponent).toBeInTheDocument();
  
  
});

test('Check that dropdown menu contains values for difficulty', () => {
  const { input } = setup();
  
  const difficultyComponent = screen.getByText("Any Difficulty");
  expect(difficultyComponent).toBeInTheDocument();
  
  fireEvent.change(screen.getByTestId("difficulty"), {
    target: { value: "Easy" },
  });
  
  const easy = screen.getByText("Easy");
  expect(easy).toBeInTheDocument();
  
});

test('Users first name appears on screen', () => {
  const { input } = setup();
  
  const categoryComponent = screen.getByText("Any Category");
  expect(categoryComponent).toBeInTheDocument();
  
  fireEvent.change(screen.getByTestId("category"), {
    target: { value: "General Knowledge" },
  });
  
  const GeneralKnowledgeOption = screen.getByText("General Knowledge");
  expect(GeneralKnowledgeOption).toBeInTheDocument();
});
