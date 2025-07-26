import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from '@mui/material';
import * as XLSX from 'xlsx'; // Import the library for exporting Excel
import { fetchUsers } from '../data/api'; // Import the API functions

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserdamages, setSelectedUserdamages] = useState<any[]>([]); // Store the damages
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); // Fetch users from the backend
        setUsers(data); // Store the fetched users in the state
        setFilteredUsers(data); // Set filtered users initially to all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  // Handle opening the modal with the selected user
  const handleClickOpen = (user: any) => {
    setSelectedUser(user);

    // Ensure damages are available and update the selectedUserdamages state
    if (user.damages && Array.isArray(user.damages)) {
      setSelectedUserdamages(user.damages); // Update selected damages
    } else {
      console.log('Damages are not available or not an array.');
      setSelectedUserdamages([]); // In case there are no damages
    }

    setOpen(true); // Open the modal
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    // Filter users based on the search query (_id search)
    const filtered = users.filter((user) =>
      user._id.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Export to Excel function
const exportToExcel = () => {
  // Prepare data by flattening the nested arrays
  const flatData = filteredUsers.map((user: any) => {
    // Flatten the user object and add details about damages, files, and officialDocs
    const damages = user.damages.map((damage: any) => `${damage.propertyType}: ${damage.description}`).join(', ');
    const files = user.files.map((file: any) => `${file.fileType}: ${file.filePath}`).join(', ');
    const officialDocs = user.officialDocs.map((doc: any) => `${doc.authorityName}: ${doc.verified ? 'Verified' : 'Not Verified'}`).join(', ');

    return {
      '_id': user._id,
      'Full Name': user.fullName,
      'Phone Number': user.phoneNumber,
      'National ID': user.nationalId,
      'Birth Place': user.birthPlace,
      'Birth Date': new Date(user.birthDate).toLocaleDateString(),
      'Registry Number': user.registryNumber,
      'Mother\'s Name': user.motherName,
      'Current Address': user.currentAddress,
      'ID Address': user.idAddress,
      'Current Country': user.currentCountry,
      'Current Job': user.currentJob,
      'Chronic Disease': user.chronicDisease ? 'Yes' : 'No',
      'War Injury': user.warInjury ? 'Yes' : 'No',
      'Refugee': user.refugee ? 'Yes' : 'No',
      'Family Members': user.familyMembers,
      'Disabled Members': user.disabledMembers ? 'Yes' : 'No',
      'Consent Data Sharing': user.consentDataSharing ? 'Yes' : 'No',
      'Consent Call': user.consentCall ? 'Yes' : 'No',
      'Declaration Signed': user.declarationSigned ? 'Yes' : 'No',
      'Declaration Date': new Date(user.declarationDate).toLocaleDateString(),
      'Declaration Signature': user.declarationSignature,
      'Damages': damages,
      'Files': files,
      'Official Docs': officialDocs,
      'Created At': new Date(user.createdAt).toLocaleDateString(),
      'Updated At': new Date(user.updatedAt).toLocaleDateString(),
    };
  });

  // Convert to Excel
  const ws = XLSX.utils.json_to_sheet(flatData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Respondents');
  XLSX.writeFile(wb, 'respondents_data.xlsx');
};


  return (
    <div style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Search input */}
      <TextField
        label="Search by Reference Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      {/* Export to Excel button */}
      <Button
        variant="contained"
        color="primary"
        onClick={exportToExcel}
        style={{ marginBottom: '20px' }}
      >
        Export to Excel
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Reference Number</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Birth Date</TableCell>
              <TableCell align="center">Birth Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id} onClick={() => handleClickOpen(user)} style={{ cursor: 'pointer' }}>
                <TableCell align="center">{user._id}</TableCell>
                <TableCell align="center">{user.fullName}</TableCell>
                <TableCell align="center">{new Date(user.birthDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">{user.birthPlace}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal (Popup Form) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography variant="body1"><strong>Reference Number:</strong> {selectedUser._id}</Typography>
              <Typography variant="body1"><strong>Full Name:</strong> {selectedUser.fullName}</Typography>
              <Typography variant="body1"><strong>Phone Number:</strong> {selectedUser.phoneNumber}</Typography>
              <Typography variant="body1"><strong>National ID:</strong> {selectedUser.nationalId}</Typography>
              <Typography variant="body1"><strong>Birth Date:</strong> {new Date(selectedUser.birthDate).toLocaleDateString()}</Typography>
              <Typography variant="body1"><strong>Birth Place:</strong> {selectedUser.birthPlace}</Typography>
              <Typography variant="body1"><strong>Registry Number:</strong> {selectedUser.registryNumber}</Typography>
              <Typography variant="body1"><strong>Mother's Name:</strong> {selectedUser.motherName}</Typography>
              <Typography variant="body1"><strong>Current Address:</strong> {selectedUser.currentAddress}</Typography>
              <Typography variant="body1"><strong>ID Address:</strong> {selectedUser.idAddress}</Typography>
              <Typography variant="body1"><strong>Current Country:</strong> {selectedUser.currentCountry}</Typography>
              <Typography variant="body1"><strong>Current Job:</strong> {selectedUser.currentJob}</Typography>
              <Typography variant="body1"><strong>Chronic Disease:</strong> {selectedUser.chronicDisease ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>War Injury:</strong> {selectedUser.warInjury ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Refugee:</strong> {selectedUser.refugee ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Family Members:</strong> {selectedUser.familyMembers}</Typography>
              <Typography variant="body1"><strong>Disabled Members:</strong> {selectedUser.disabledMembers ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Consent Data Sharing:</strong> {selectedUser.consentDataSharing ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Consent Call:</strong> {selectedUser.consentCall ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Declaration Signed:</strong> {selectedUser.declarationSigned ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Declaration Date:</strong> {new Date(selectedUser.declarationDate).toLocaleDateString()}</Typography>
              <Typography variant="body1"><strong>Declaration Signature:</strong> {selectedUser.declarationSignature}</Typography>
              <Typography variant="body1"><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</Typography>
              <Typography variant="body1"><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleDateString()}</Typography>

              {/* Display the damages data */}
              <Typography variant="h6" className="mt-4">Damages Information</Typography>
              {selectedUserdamages && selectedUserdamages.length > 0 ? (
                selectedUserdamages.map((damage: any, index: number) => (
                  <div key={index}>
                    <Typography variant="body1"><strong>Property Type:</strong> {damage.propertyType}</Typography>
                    <Typography variant="body1"><strong>Address:</strong> {damage.address}</Typography>
                    <Typography variant="body1"><strong>City:</strong> {damage.city}</Typography>
                    <Typography variant="body1"><strong>Coordinates:</strong> {damage.coordinates}</Typography>
                    <Typography variant="body1"><strong>Description:</strong> {damage.description}</Typography>
                    <Typography variant="body1"><strong>Damage Full Building:</strong> {damage.damageFullBuilding ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body1"><strong>Damage Partial:</strong> {damage.damagePartial ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body1"><strong>Damage Infra:</strong> {damage.damageInfra ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body1"><strong>Damage Fire:</strong> {damage.damageFire ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body1"><strong>Damage Theft:</strong> {damage.damageTheft ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body1"><strong>Damage Water:</strong> {damage.damageWater ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body1"><strong>Damage ID:</strong> {damage._id}</Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body1">No damages data available.</Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
