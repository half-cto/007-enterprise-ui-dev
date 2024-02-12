import { render, screen } from 'test/utilities';
import PackingList from '.';
import userEvent from '@testing-library/user-event';
import { exec } from 'child_process';
import exp from 'constants';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);

  const newItemInput = screen.getByLabelText(/new item name/i);

  expect(newItemInput).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  render(<PackingList />);
  const user = userEvent.setup();

  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });

  await user.type(newItemInput, 'test');

  expect(newItemInput).toHaveValue('test');
  expect(addNewItemButton).toBeEnabled();

  await user.clear(newItemInput);

  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  render(<PackingList />);
  const user = userEvent.setup();

  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });

  await user.type(newItemInput, 'test');

  expect(newItemInput).toHaveValue('test');
  expect(addNewItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  render(<PackingList />);
  const user = userEvent.setup();

  const newItemInput = screen.getByRole('searchbox', {
    name: /new item name/i,
  });
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });

  await user.type(newItemInput, 'testItem');

  expect(newItemInput).toHaveValue('testItem');
  expect(addNewItemButton).toBeEnabled();

  await user.click(addNewItemButton);

  const newItem = screen.getByDisplayValue('testItem');
  expect(newItem).toBeInTheDocument();
});
