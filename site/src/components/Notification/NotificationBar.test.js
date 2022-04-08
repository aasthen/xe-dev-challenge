import { render, cleanup } from '@testing-library/react';
import NotificationBar from './NotificationBar';

afterEach(cleanup);

test('renders NotificationBar and displays message', () => {

    const notificationProps = {
        open: true,
        severity: 'error',
        message: 'Error message here',
    }
    const { getByText } = render(<NotificationBar {...notificationProps} />);

    // check all headers are displayed
    expect(getByText(/Error message here/i)).toBeInTheDocument();
});

test('renders NotificationBar and displays success message', () => {

    const notificationProps = {
        open: true,
        severity: 'success',
        message: 'Success notification message',
    }
    const { getByText, getByTestId } = render(<NotificationBar {...notificationProps} />);

    // check all headers are displayed
    expect(getByText(/Success notification message/i)).toBeInTheDocument();
    expect(getByTestId('SuccessOutlinedIcon')).toBeInTheDocument();
});

test('renders NotificationBar and displays error message', () => {

    const notificationProps = {
        open: true,
        severity: 'error',
        message: 'Error notification message',
    }
    const { getByText, getByTestId } = render(<NotificationBar {...notificationProps} />);

    // check all headers are displayed
    expect(getByText(/Error notification message/i)).toBeInTheDocument();
    expect(getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
});

test('renders NotificationBar and displays info message', () => {

    const notificationProps = {
        open: true,
        severity: 'info',
        message: 'Informative notification message',
    }
    const { getByText, getByTestId } = render(<NotificationBar {...notificationProps} />);

    // check all headers are displayed
    expect(getByText(/Informative notification message/i)).toBeInTheDocument();
    expect(getByTestId('InfoOutlinedIcon')).toBeInTheDocument();
});

test('renders NotificationBar and displays info message', () => {

    const notificationProps = {
        open: true,
        severity: 'warning',
        message: 'Warning notification message',
    }
    const { getByText, getByTestId } = render(<NotificationBar {...notificationProps} />);

    // check all headers are displayed
    expect(getByText(/Warning notification message/i)).toBeInTheDocument();
    expect(getByTestId('ReportProblemOutlinedIcon')).toBeInTheDocument();
});