import { useState, useEffect } from "react";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { Backdrop, Dialog, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { db } from "./firebase";
import NotificationBar from './components/Notification/NotificationBar';
import PropertyTable from './components/PropertyTable/PropertyTable';
import PropertyForm from "./components/Form/PropertyForm";
import { environment } from "./environments/environment"


function App() {

  const [properties, setProperties] = useState([]);
  const [notification, setNotification] = useState({ open: false, severity: 'success', message: ' ' });
  const [openPropertyForm, setOpenPropertyForm] = useState(false);
  const propertiesCollectionRef = collection(db, "ads-properties");

  const updateProperties = async () => {
    const data = await getDocs(propertiesCollectionRef);
    setProperties(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Open the dialog for the property information 
  const handleOpenFormModal = () => {
    setOpenPropertyForm(true);
  }

  // Closes the dialog for the property information
  //   It is passed also to the PropertyForm to be used to the close button
  const handleCloseFormModal = () => {
    setOpenPropertyForm(false);
  }

  // function that received the submitted property and stores it to the firestore
  //   It is passed also to the PropertyForm to be used to the submit button
  const handleSubmitProperty = async (propertyInfo) => {
    // Logging of the submitted property information
    console.log(propertyInfo);

    // Store property to firestore and trigger notification based on the result
    addDoc(propertiesCollectionRef, propertyInfo).then((res) => {
      // Display a successful notification
      setNotification(
        {
          open: true,
          severity: 'success',
          message: 'Property has been successfully stored',
        }
      );
      // read properties from the firestore
      updateProperties();
    })
      .catch((error) => {
        // Log and display a notification for the error
        console.error("Error inserting property ", error);
        setNotification(
          {
            open: true,
            severity: 'error',
            message: 'Property storing resulted to an error',
          }
        );
      });

    handleCloseFormModal();
  }

  // function that requests from an api the input given and return the list of possible areas
  //   It is passed also to the PropertyForm to be used for the area autocomplete input
  async function getAutocompleteEntries(input) {
    const url = environment.autocompleteAPI.url(encodeURIComponent(input));

    try {
      // axios is used to perform a GET request
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Log and display a notification for the error
      console.error("Error retrieving possible property areas", error);
      setNotification(
        {
          open: true,
          severity: 'error',
          message: 'Error retrieving autocomplete entries',
        }
      );
      return [];
    }
  };

  // Populate the table of properties
  useEffect(() => {
    const getProperties = async () => {
      const data = await getDocs(collection(db, "ads-properties"));
      setProperties(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProperties();

  }, []);

  return (
    <div className="App">
      <h2>
        Stored properties
      </h2>

      <div className="propertyButton">
        <Button
          startIcon={<AddIcon />}
          className="propertyButton"
          variant="contained"
          onClick={handleOpenFormModal}
        >
          Add Property
        </Button>
      </div>
      <NotificationBar {...notification} />
      <PropertyTable data={properties} />
      <Dialog
        open={openPropertyForm}
        onClose={handleCloseFormModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        fullWidth
        maxWidth="md"
        scroll="paper"
        BackdropProps={{
          timeout: 500,
        }}
      >
        <PropertyForm
          autoCompleteAction={getAutocompleteEntries}
          handleCloseAction={handleCloseFormModal}
          submitPropertyAction={handleSubmitProperty}
        />
      </Dialog>
    </div>
  );
}

export default App;
