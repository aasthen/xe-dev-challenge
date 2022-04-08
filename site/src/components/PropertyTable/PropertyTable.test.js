import { render, cleanup } from '@testing-library/react';
import PropertyTable from './PropertyTable';


function createData(title, type, area, placeId, price, extraInfo) {
    return { title, type, area, placeId, price, extraInfo };
}

afterEach(cleanup);

test('renders PropertyTable empty', () => {

    const {getByText} = render(<PropertyTable />);

    // check all headers are displayed
    expect(getByText(/Title/i)).toBeInTheDocument();
    expect(getByText(/Type/i)).toBeInTheDocument();
    expect(getByText(/Area/i)).toBeInTheDocument();
    expect(getByText(/PlaceId/i)).toBeInTheDocument();
    expect(getByText(/Price/i)).toBeInTheDocument();
    expect(getByText(/ExtraDescription/i)).toBeInTheDocument();
});

test('renders PropertyTable with a sample property', () => {

    const rows = [
        createData('TinosTitle', 'Rent', 'Tinos', 'ABC123def789', 240,'There is extra Info'),
    ];

    const {getByTestId} = render(<PropertyTable data={rows} />);

    // check all values are set as expected
    expect(getByTestId('titleCell0')).toHaveTextContent('TinosTitle');
    expect(getByTestId('typeCell0')).toHaveTextContent('Rent');
    expect(getByTestId('areaCell0')).toHaveTextContent('Tinos');
    expect(getByTestId('placeCell0')).toHaveTextContent('ABC123def789');
    expect(getByTestId('priceCell0')).toHaveTextContent(240);
    expect(getByTestId('extraInfoCell0')).toHaveTextContent('There is extra Info');
});

test('renders PropertyTable with three properties', () => {

    const rows = [
        createData('Title1', 'Rent', 'Tinos', 'ABC123def789', 240,''),
        createData('Title2', 'Rent', 'Tinos', 'ABC123def789', 241,''),
        createData('Title3', 'Rent', 'Tinos', 'ABC123def789', 242,''),
    ];

    const {getByTestId} = render(<PropertyTable data={rows} />);

    //Check that three rows are displayed
    expect(getByTestId('titleCell0')).toBeInTheDocument();
    expect(getByTestId('titleCell1')).toBeInTheDocument();
    expect(getByTestId('titleCell2')).toBeInTheDocument();
});
