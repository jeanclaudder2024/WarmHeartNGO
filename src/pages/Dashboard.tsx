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
  Box,
} from '@mui/material';
import * as XLSX from 'xlsx'; // Import the library for exporting Excel
import { fetchUsers } from '../data/api'; // Import the API functions
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

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
    // Filter users based on the search query (flat reference_number or full_name)
    const filtered = users.filter((user) =>
      (user.reference_number && user.reference_number.toLowerCase().includes(query)) ||
      (user.full_name && user.full_name.toLowerCase().includes(query)) ||
      (user.national_id && user.national_id.includes(query))
    );
    setFilteredUsers(filtered);
  };

  // Export to Excel function
  const exportToExcel = () => {
    // Prepare data by mapping the flat Supabase respondents structure
    const flatData = filteredUsers.map((user: any) => {
      return {
        'Reference Number': user.reference_number,
        'Full Name': user.full_name,
        'Phone Number': user.phone_number,
        'National ID': user.national_id,
        'Birth Place': user.birth_place,
        'Birth Date': user.birth_date ? new Date(user.birth_date).toLocaleDateString() : '',
        'Registry Number': user.registry_number,
        'Mother\'s Name': user.mother_name,
        'Email': user.email,
        'Current Address': user.current_address,
        'ID Address': user.id_address,
        'Current Country': user.current_country,
        'Current Job': user.current_job,
        'Housing Type': user.housing_type,
        'Preferred Contact': user.preferred_contact,
        'Family Members': user.family_members,

        'Chronic Disease': user.chronic_disease ? 'Yes' : 'No',
        'War Injury': user.war_injury ? 'Yes' : 'No',
        'Disabled Members': user.disabled_members ? 'Yes' : 'No',
        'Refugee': user.refugee ? 'Yes' : 'No',
        'Refugee Reg No': user.refugee_registration_no,
        'Refugee File No': user.refugee_file_no,

        'Property Type': user.property_type,
        'Governorate': user.governorate,
        'City': user.city,
        'Damage Address': user.damage_address,
        'Damage Description': user.damage_description,
        'Damage Value': user.damage_value,
        'Multi-Damage': `Full:${user.damage_full_building ? 'Y' : 'N'} Partial:${user.damage_partial ? 'Y' : 'N'} Infra:${user.damage_infra ? 'Y' : 'N'} Fire:${user.damage_fire ? 'Y' : 'N'} Water:${user.damage_water ? 'Y' : 'N'}`,
        'Other Property Details': user.other_property_details,
        'Coordinates': user.coordinates,

        'Documented By Official': user.documented_by_official ? 'Yes' : 'No',
        'Official Entity': user.official_documentation_entity,
        'Notes': user.notes,

        'Declaration Name': user.declaration_name,
        'Declaration Date': user.declaration_date ? new Date(user.declaration_date).toLocaleDateString() : '',
        'Declaration Signature': user.declaration_signature,
        'Consent Data Sharing': user.consent_data_sharing ? 'Yes' : 'No',
        'Consent Call': user.consent_call ? 'Yes' : 'No',

        'Created At': user.created_at ? new Date(user.created_at).toLocaleDateString() : '',
      };
    });

    // Convert to strict Excel .xlsx file and download
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Respondents');
    XLSX.writeFile(wb, 'respondents_all_data.xlsx');
  };

  // Export a single user to Excel
  const exportSingleToExcel = (userToExport: any) => {
    const flatData = [{
      'Reference Number': userToExport.reference_number,
      'Full Name': userToExport.full_name,
      'Phone Number': userToExport.phone_number,
      'National ID': userToExport.national_id,
      'Birth Place': userToExport.birth_place,
      'Birth Date': userToExport.birth_date ? new Date(userToExport.birth_date).toLocaleDateString() : '',
      'Registry Number': userToExport.registry_number,
      'Mother\'s Name': userToExport.mother_name,
      'Email': userToExport.email,
      'Current Address': userToExport.current_address,
      'ID Address': userToExport.id_address,
      'Current Country': userToExport.current_country,
      'Current Job': userToExport.current_job,
      'Housing Type': userToExport.housing_type,
      'Preferred Contact': userToExport.preferred_contact,
      'Family Members': userToExport.family_members,

      'Chronic Disease': userToExport.chronic_disease ? 'Yes' : 'No',
      'War Injury': userToExport.war_injury ? 'Yes' : 'No',
      'Disabled Members': userToExport.disabled_members ? 'Yes' : 'No',
      'Refugee': userToExport.refugee ? 'Yes' : 'No',
      'Refugee Reg No': userToExport.refugee_registration_no,
      'Refugee File No': userToExport.refugee_file_no,

      'Property Type': userToExport.property_type,
      'Governorate': userToExport.governorate,
      'City': userToExport.city,
      'Damage Address': userToExport.damage_address,
      'Damage Description': userToExport.damage_description,
      'Damage Value': userToExport.damage_value,
      'Multi-Damage': `Full:${userToExport.damage_full_building ? 'Y' : 'N'} Partial:${userToExport.damage_partial ? 'Y' : 'N'} Infra:${userToExport.damage_infra ? 'Y' : 'N'} Fire:${userToExport.damage_fire ? 'Y' : 'N'} Water:${userToExport.damage_water ? 'Y' : 'N'}`,
      'Other Property Details': userToExport.other_property_details,
      'Coordinates': userToExport.coordinates,

      'Documented By Official': userToExport.documented_by_official ? 'Yes' : 'No',
      'Official Entity': userToExport.official_documentation_entity,
      'Notes': userToExport.notes,

      'Declaration Name': userToExport.declaration_name,
      'Declaration Date': userToExport.declaration_date ? new Date(userToExport.declaration_date).toLocaleDateString() : '',
      'Declaration Signature': userToExport.declaration_signature,
      'Consent Data Sharing': userToExport.consent_data_sharing ? 'Yes' : 'No',
      'Consent Call': userToExport.consent_call ? 'Yes' : 'No',

      'Created At': userToExport.created_at ? new Date(userToExport.created_at).toLocaleDateString() : '',
    }];

    // Convert to strict Excel .xlsx file and download
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Respondent Details');
    XLSX.writeFile(wb, `respondent_${userToExport.reference_number || 'data'}.xlsx`);
  };


  return (
    <Box sx={{
      minHeight: '100vh',
      py: 6,
      px: 3,
      background: `
        radial-gradient(circle at 15% 50%, rgba(229, 57, 53, 0.05), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(255, 138, 101, 0.08), transparent 25%),
        linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)
      `,
      position: 'relative'
    }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, color: 'primary.dark', mb: 4 }}>
        لوحة تحكم المسؤول
      </Typography>

      {/* Search input */}
      <TextField
        label="البحث عن طريق الرقم المرجعي أو الاسم"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }
        }}
      />

      {/* Export to Excel & Logout buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{
            py: 1, px: 4,
            borderRadius: 8,
            fontWeight: 'bold',
            borderWidth: 2,
            '&:hover': { borderWidth: 2 }
          }}
        >
          تسجيل الخروج
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          sx={{
            py: 1, px: 4,
            borderRadius: 8,
            fontWeight: 'bold',
            boxShadow: '0 4px 14px rgba(229, 57, 53, 0.3)'
          }}
        >
          تصدير الكل إلى Excel
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>رقم المرجع</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>الاسم الكامل</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>رقم الهاتف</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>الرقم الوطني</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>تاريخ الميلاد</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>مكان الولادة</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>المدينة</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>نوع العقار</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>وصف الضرر</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>الإجراء</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(229, 57, 53, 0.04)' } }}>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{user.reference_number}</TableCell>
                <TableCell align="center">{user.full_name}</TableCell>
                <TableCell align="center" sx={{ direction: 'ltr' }}>{user.phone_number}</TableCell>
                <TableCell align="center">{user.national_id}</TableCell>
                <TableCell align="center">{user.birth_date ? new Date(user.birth_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell align="center">{user.birth_place || 'N/A'}</TableCell>
                <TableCell align="center">{user.governorate || 'N/A'}</TableCell>
                <TableCell align="center">{user.city || 'N/A'}</TableCell>
                <TableCell align="center">{user.property_type || 'N/A'}</TableCell>
                <TableCell align="center">{user.damage_description ? (user.damage_description.substring(0, 30) + (user.damage_description.length > 30 ? '...' : '')) : 'N/A'}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" size="small" onClick={() => handleClickOpen(user)} sx={{ borderRadius: 6, textTransform: 'none' }}>
                    عرض التفاصيل
                  </Button>
                </TableCell>
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
              <Typography variant="body1"><strong>Reference Number:</strong> {selectedUser.reference_number}</Typography>
              <Typography variant="body1"><strong>Full Name:</strong> {selectedUser.full_name}</Typography>
              <Typography variant="body1"><strong>Phone Number:</strong> {selectedUser.phone_number}</Typography>
              <Typography variant="body1"><strong>National ID:</strong> {selectedUser.national_id}</Typography>
              <Typography variant="body1"><strong>Birth Date:</strong> {selectedUser.birth_date ? new Date(selectedUser.birth_date).toLocaleDateString() : 'N/A'}</Typography>
              <Typography variant="body1"><strong>Birth Place:</strong> {selectedUser.birth_place}</Typography>
              <Typography variant="body1"><strong>Registry Number:</strong> {selectedUser.registry_number}</Typography>
              <Typography variant="body1"><strong>Mother's Name:</strong> {selectedUser.mother_name}</Typography>
              <Typography variant="body1"><strong>Current Address:</strong> {selectedUser.current_address}</Typography>
              <Typography variant="body1"><strong>ID Address:</strong> {selectedUser.id_address}</Typography>
              <Typography variant="body1"><strong>Current Country:</strong> {selectedUser.current_country}</Typography>
              <Typography variant="body1"><strong>Current Job:</strong> {selectedUser.current_job}</Typography>
              <Typography variant="body1"><strong>Chronic Disease:</strong> {selectedUser.chronic_disease ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>War Injury:</strong> {selectedUser.war_injury ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Refugee:</strong> {selectedUser.refugee ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Family Members:</strong> {selectedUser.family_members}</Typography>
              <Typography variant="body1"><strong>Disabled Members:</strong> {selectedUser.disabled_members ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Consent Data Sharing:</strong> {selectedUser.consent_data_sharing ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Consent Call:</strong> {selectedUser.consent_call ? 'Yes' : 'No'}</Typography>
              <Typography variant="body1"><strong>Declaration Name:</strong> {selectedUser.declaration_name}</Typography>
              <Typography variant="body1"><strong>Declaration Date:</strong> {selectedUser.declaration_date ? new Date(selectedUser.declaration_date).toLocaleDateString() : 'N/A'}</Typography>
              <Typography variant="body1"><strong>Declaration Signature:</strong> {selectedUser.declaration_signature}</Typography>
              <Typography variant="body1"><strong>Created At:</strong> {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : 'N/A'}</Typography>

              <Typography variant="h6" className="mt-4" sx={{ mt: 3, mb: 1, color: 'primary.main', fontWeight: 'bold' }}>Damages Information</Typography>
              <div>
                <Typography variant="body1"><strong>Property Type:</strong> {selectedUser.property_type}</Typography>
                <Typography variant="body1"><strong>Governorate:</strong> {selectedUser.governorate}</Typography>
                <Typography variant="body1"><strong>City:</strong> {selectedUser.city}</Typography>
                <Typography variant="body1"><strong>Damage Address:</strong> {selectedUser.damage_address}</Typography>
                <Typography variant="body1"><strong>Damage Description:</strong> {selectedUser.damage_description}</Typography>
                <Typography variant="body1"><strong>Coordinates:</strong> {selectedUser.coordinates}</Typography>
                <Typography variant="body1"><strong>Estimated Value:</strong> {selectedUser.damage_value}</Typography>
                <Typography variant="body1"><strong>Full Building Damage:</strong> {selectedUser.damage_full_building ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1"><strong>Partial Damage:</strong> {selectedUser.damage_partial ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1"><strong>Infrastructure Damage:</strong> {selectedUser.damage_infra ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1"><strong>Fire Damage:</strong> {selectedUser.damage_fire ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1"><strong>Theft Damage:</strong> {selectedUser.damage_theft ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1"><strong>Water Damage:</strong> {selectedUser.damage_water ? 'Yes' : 'No'}</Typography>
                {selectedUser.other_property_damaged && (
                  <Typography variant="body1"><strong>Other Damaged Property Details:</strong> {selectedUser.other_property_details}</Typography>
                )}
              </div>

              <Typography variant="h6" className="mt-4" sx={{ mt: 3, mb: 1, color: 'primary.main', fontWeight: 'bold' }}>Additional Notes</Typography>
              <Typography variant="body1"><strong>Documented by Official:</strong> {selectedUser.documented_by_official ? 'Yes' : 'No'}</Typography>
              {selectedUser.documented_by_official && (
                <Typography variant="body1"><strong>Official Entity:</strong> {selectedUser.official_documentation_entity}</Typography>
              )}
              <Typography variant="body1"><strong>General Notes:</strong> {selectedUser.notes}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => exportSingleToExcel(selectedUser)}
            sx={{ borderRadius: 8, fontWeight: 'bold' }}
          >
            تصدير هذا النموذج إلى Excel
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined" sx={{ borderRadius: 8, fontWeight: 'bold' }}>
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
