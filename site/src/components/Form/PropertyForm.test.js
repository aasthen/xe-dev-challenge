import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import PropertyForm from './PropertyForm';

afterEach(cleanup);

test('renders PropertyForm correctly', () => {

    const { getByTestId, queryByTestId } = render(<PropertyForm />);

    // check all headers are displayed
    expect(getByTestId('title-input')).toBeInTheDocument();
    expect(getByTestId('type-selection')).toBeInTheDocument();
    expect(getByTestId('area-autocomplete-input')).toBeInTheDocument();
    expect(getByTestId('price-input')).toBeInTheDocument();
    expect(getByTestId('extraInfo-input')).toBeInTheDocument();
    expect(getByTestId('info')).toBeInTheDocument();
    expect(queryByTestId('error')).not.toBeInTheDocument();
});

test('renders PropertyForm close button triggers handleCloseAction', () => {

    let closeFired = false;

    const handleCloseFormModal = async () => {
        closeFired = true;
        return [];
    };

    const { getByTestId } = render(<PropertyForm
        autoCompleteAction={async () => { }}
        handleCloseAction={handleCloseFormModal}
        submitPropertyAction={async () => { }}
    />);

    userEvent.click(getByTestId('close-button'));
    expect(closeFired).toBe(true);

});

test('renders PropertyForm trigger autoCompleteAction after three characters', async () => {

    let autocompleteFired = false;
    const getAutocompleteEntries = async () => {
        autocompleteFired = true;
        return [];
    };

    const { getByTestId } = render(<PropertyForm
        autoCompleteAction={getAutocompleteEntries}
        handleCloseAction={async () => { }}
        submitPropertyAction={async () => { }}
    />);

    const field = getByTestId('area-autocomplete-input').querySelector('input');

    // Type only two chars, it should not trigger the autocomplete api request
    userEvent.type(field, 'al');
    await waitFor(() => expect(autocompleteFired).toBe(false));
    autocompleteFired = false;

    // Type one more char, now it should trigger the autocomplete api request
    userEvent.type(field, 'e');
    await waitFor(() => expect(autocompleteFired).toBe(true));
    autocompleteFired = false;

    // Typeing more chars, it should trigger once more the autocomplete api request
    userEvent.type(field, 'xandroupoli');
    await waitFor(() => expect(autocompleteFired).toBe(true));
    autocompleteFired = false;

});


test('renders PropertyForm trigger submitPropertyAction after all mandatory fields', async () => {

    const getAutocompleteEntries = async () => {
        return [
            {
                "placeId": "ChIJ1cgCXJ8cshQR40EeRCv5sLo",
                "mainText": "Alexandroupoli",
                "secondaryText": "Ελλάδα"
            }
        ];
    };

    let submitActionFired = false;
    const submitPropertyAction = async () => {
        submitActionFired = true;
    };

    const { getByTestId, getAllByRole } = render(<PropertyForm
        autoCompleteAction={getAutocompleteEntries}
        handleCloseAction={async () => { }}
        submitPropertyAction={submitPropertyAction}
    />);

    const titleField = getByTestId('title-input').querySelector('input');
    const areaField = getByTestId('area-autocomplete-input').querySelector('input');
    const priceField = getByTestId('price-input').querySelector('input');

    // Adding first the title and then clicking the submit
    userEvent.type(titleField, 'Alexandroupoli Rent Property');
    userEvent.click(getByTestId('submit-button'));
    await waitFor(() => expect(submitActionFired).toBe(false));
    submitActionFired = false;

    // Adding then the area without a matching place id and then clicking the submit
    userEvent.type(areaField, 'Alexandroupoli');
    userEvent.click(getByTestId('submit-button'));
    await waitFor(() => expect(submitActionFired).toBe(false));
    submitActionFired = false;

    // Adding then the price and then clicking the submit it is triggered
    userEvent.type(priceField, "450");
    userEvent.click(getByTestId('submit-button'));
    await waitFor(() => expect(submitActionFired).toBe(true));

});

test('renders PropertyForm dont trigger submitPropertyAction even all mandatory fields as there is no matching area', async () => {

    const getAutocompleteEntries = async () => {
        return [
            {
                "placeId": "ChIJ1cgCXJ8cshQR40EeRCv5sLo",
                "mainText": "Alexandroupoli",
                "secondaryText": "Ελλάδα"
            }
        ];
    };

    let submitActionFired = false;
    const submitPropertyAction = async () => {
        submitActionFired = true;
    };

    const { getByTestId, getAllByRole } = render(<PropertyForm
        autoCompleteAction={getAutocompleteEntries}
        handleCloseAction={async () => { }}
        submitPropertyAction={submitPropertyAction}
    />);

    const titleField = getByTestId('title-input').querySelector('input');
    const areaField = getByTestId('area-autocomplete-input').querySelector('input');
    const priceField = getByTestId('price-input').querySelector('input');

    // Adding first the title and then clicking the submit
    userEvent.type(titleField, 'Alexandroupoli Rent Property');
    userEvent.click(getByTestId('submit-button'));
    await waitFor(() => expect(submitActionFired).toBe(false));
    submitActionFired = false;

    // Adding then the price and then clicking the submit
    userEvent.type(priceField, "450");
    userEvent.click(getByTestId('submit-button'));
    await waitFor(() => expect(submitActionFired).toBe(false));
    submitActionFired = false;

    // Typing not the whole matching are name, submit is not triggered
    userEvent.type(areaField, 'Alexandroupoli');
    userEvent.click(getByTestId('submit-button'));
    await waitFor(() => expect(submitActionFired).toBe(false));

});
