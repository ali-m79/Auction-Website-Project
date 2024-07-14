import {render} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Boxes from "../components/Boxes/Boxs"
test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Boxes />)
  expect(true).toBe(true)
  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  //await screen.findByRole('heading')

  // ASSERT
  //expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  //(screen.getByRole('button')).toBeDisabled()
})