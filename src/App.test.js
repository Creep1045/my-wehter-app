// 예: "검색" 버튼이 렌더링되는지 테스트
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/검색/i);
  expect(buttonElement).toBeInTheDocument();
});
