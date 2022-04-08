import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Select, FormControl, InputLabel, MenuItem, Button, Autocomplete } from "@mui/material"
import { typeNames } from '../../constants/property_types'


const PropertyForm = (props) => {

    const {
        autoCompleteAction,
        handleCloseAction,
        submitPropertyAction
    } = props;

    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Rent');
    const [area, setArea] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [price, setPrice] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [autocompleteMatchError, setAutocompleteMatchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        // validations
        if (title.length === 0) {
            setErrorMessage('Title is mandatory');
            return;
        }
        if (title.length > 155) {
            setErrorMessage('Title cannot exceed 155 chars');
            return;
        }
        if (type.length === 0) {
            setErrorMessage('Property type is mandatory');
            return;
        }
        if (area.length === 0) {
            setErrorMessage('Property area is mandatory');
            return;
        }
        if (placeId <= 0) {
            setErrorMessage('No area match found');
            return;
        }
        if (price <= 0) {
            setErrorMessage('Price can only be positive & non zero');
            return;
        }

        const propertyInfo = {
            title: title,
            type: type,
            price: price,
            area: area,
            placeId: placeId,
            extraInfo: extraInfo
        };

        submitPropertyAction(propertyInfo);
    }

    const handleInputChange = async (newValue) => {

        setArea(newValue);
        // Clear autocomplete entries and set to loading
        setAutocompleteOptions([]);
        setLoading(true);
        if (newValue.length >= 3) {

            const autocompleteEntries = await autoCompleteAction(newValue);
            if (autocompleteEntries.length === 0) {
                setPlaceId('');
                setAutocompleteMatchError(true);
                return;
            }

            // Construct the option values. In case of multiple occurences of the same maintext, concatenate also with secondaryText
            const autocompleteOptionInitialList = autocompleteEntries.map((option) => option.mainText);
            const autocompleteOptionList = autocompleteEntries.map((option) => {
                if (autocompleteOptionInitialList.indexOf(option.mainText) !==
                    autocompleteOptionInitialList.lastIndexOf(option.mainText)) {
                    return option.mainText.concat(' ', '(', option.secondaryText, ')');
                }
                else {
                    return option.mainText;
                }
            });
            await setAutocompleteOptions(autocompleteOptionList);

            const newValueMain = newValue.split(' (')[0].toLowerCase();
            // Verify if the input is a match with a selection
            const areaSelectionMatch = autocompleteEntries.find(area => area.mainText.toLowerCase() === newValueMain);
            if (areaSelectionMatch !== undefined) {
                // we have a match, so assign the placeid of the matched area
                setPlaceId(areaSelectionMatch.placeId);
            }
            else
            {
                setPlaceId('');
            }

            setAutocompleteMatchError(areaSelectionMatch !== undefined ? false : true);
        }
        else {
            setPlaceId('');
        }
        setLoading(false);
    };

    return (
        <div className='propertyForm'>
            <h1>New Property Classified</h1>
            {errorMessage.length === 0 ?
                <p className='info' data-testid="info">
                    Please enter the information for the new listing of property.
                </p>
                :
                <p className='error' data-testid="error">
                    {errorMessage}
                </p>
            }
            <Box
                component="form"
                style={{ margin: '8px' }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className='formfields'>
                    <TextField
                        error={title.length > 155}
                        helperText={title.length > 155 ? 'Title should not exceed 155 chars' : 'Classified title up to 155 chars'}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                        id="title-input"
                        data-testid="title-input"
                        label="Title"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: 19 }}>
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel id="type-selection-label">Type</InputLabel>
                        <Select
                            labelId="type-selection-label"
                            id="type-selection"
                            data-testid="type-selection"
                            label="Type"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            inputProps={{
                              id: "vatSelectInput"
                            }}
                        >
                            {typeNames.map((type) => (
                                <MenuItem data-testid="type-selection-option" key={type} value={type}>{type}</MenuItem>
                            ))}

                        </Select>
                    </FormControl></div>
                <div className='formfields'>
                    <Autocomplete
                        freeSolo
                        autoSelect
                        id="area-autocomplete"
                        data-testid="area-autocomplete"
                        loading={loading}
                        disableClearable
                        options={autocompleteOptions}
                        value={area}
                        onInputChange={(event, newInputValue) => {
                            handleInputChange(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                                error={autocompleteMatchError}
                                helperText={autocompleteMatchError ? 'Area does not match with any of the options' : 'Type the area of the property. Field is an autocomplete'}
                                required
                                id="area-autocomplete-input"
                                data-testid="area-autocomplete-input"
                                label="Area"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        error={price < 0}
                        helperText={price < 0 ? 'Price can only be positive' : 'Price amount'}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        required
                        id="price-input"
                        data-testid="price-input"
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className='formfields'>
                    <TextField
                        helperText=' '
                        value={extraInfo}
                        onChange={(event) => setExtraInfo(event.target.value)}
                        id="extraInfo-input"
                        data-testid="extraInfo-input"
                        label="Extra Description"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div>
                    <Button
                        variant="outlined"
                        data-testid="close-button"
                        onClick={handleCloseAction}
                    >
                        Close
                    </Button>
                    <Button
                        style={{ margin: '0px 10px' }}
                        variant="contained"
                        data-testid="submit-button"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </Box>
        </div>
    );
}

PropertyForm.protoΤypes = {

    autoCompleteAction: PropTypes.func,
    handleCloseAction: PropTypes.func,
    submitPropertyAction: PropTypes.func
};

export default PropertyForm;