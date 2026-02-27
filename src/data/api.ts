import { supabase } from '../lib/supabase';

// Generate a random ID/Reference number
const generateReferenceNumber = () => {
  return `WH-${Math.floor(Math.random() * 1000000)}`;
};

// Function to fetch data
export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('respondents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching users from Supabase:", error);
    throw new Error('Error fetching users from Supabase');
  }
};

// Function to fetch a single user by reference number
export const fetchUserByReferenceNumber = async (referenceNumber: string) => {
  try {
    const { data, error } = await supabase
      .from('respondents')
      .select('*')
      .eq('reference_number', referenceNumber)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user from Supabase:", error);
    throw new Error('Error fetching user data from Supabase');
  }
};

// Function to send form data to Supabase
export const submitFormData = async (formData: any) => {
  try {
    // Determine the reference number
    const referenceNumber = formData.reference_number || generateReferenceNumber();

    // Map the nested formData to the flat Supabase respondents table schema
    const payload = {
      reference_number: referenceNumber,

      // Personal Info
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      national_id: formData.nationalId,
      birth_place: formData.birthPlace,
      birth_date: formData.birthDate || null,
      registry_number: formData.registryNumber,
      mother_name: formData.motherName,
      email: formData.email,
      current_address: formData.currentAddress,
      id_address: formData.idAddress,
      current_country: formData.currentCountry,
      current_job: formData.currentJob,
      housing_type: formData.housingType,
      preferred_contact: formData.preferredContact,
      family_members: formData.familyMembers ? parseInt(formData.familyMembers) : 0,

      // Health & Social
      chronic_disease: formData.chronicDisease || false,
      war_injury: formData.warInjury || false,
      disabled_members: formData.disabledMembers || false,
      refugee: formData.refugee || false,
      refugee_registration_no: formData.refugeeRegistrationNo,
      refugee_file_no: formData.refugeeFileNo,
      refugee_reg_date: formData.refugeeRegDate || null,

      // Damage Details (extract from nested formData.damage or formData.damages array)
      property_type: formData.damage?.propertyType || formData.damages?.[0]?.propertyType,
      governorate: formData.damage?.governorate || formData.damages?.[0]?.governorate,
      city: formData.damage?.city || formData.damages?.[0]?.city,
      damage_address: formData.damage?.address || formData.damages?.[0]?.address,
      damage_description: formData.damage?.description || formData.damages?.[0]?.description,
      damage_full_building: formData.damage?.damageFullBuilding || formData.damages?.[0]?.damageFullBuilding || false,
      damage_partial: formData.damage?.damagePartial || formData.damages?.[0]?.damagePartial || false,
      damage_infra: formData.damage?.damageInfra || formData.damages?.[0]?.damageInfra || false,
      damage_fire: formData.damage?.damageFire || formData.damages?.[0]?.damageFire || false,
      damage_theft: formData.damage?.damageTheft || formData.damages?.[0]?.damageTheft || false,
      damage_water: formData.damage?.damageWater || formData.damages?.[0]?.damageWater || false,
      damage_value: formData.damage?.damageValue || formData.damages?.[0]?.damageValue,
      other_property_damaged: formData.damage?.otherPropertyDamaged || formData.damages?.[0]?.otherPropertyDamaged || false,
      other_property_details: formData.damage?.otherPropertyDetails || formData.damages?.[0]?.otherPropertyDetails,
      coordinates: formData.coordinates || formData.damage?.coordinates || formData.damages?.[0]?.coordinates,

      // Additional Notes
      documented_by_official: formData.documentedByOfficial || false,
      official_documentation_entity: formData.officialDocumentationEntity,
      notes: formData.notes,

      // Declarations
      declaration_name: formData.declarationName,
      declaration_date: formData.declarationDate || null,
      declaration_signature: formData.declarationSignature,
      consent_data_sharing: formData.consentDataSharing || false,
      consent_call: formData.consentCall || false
    };

    const { data, error } = await supabase
      .from('respondents')
      .insert([payload])
      .select();

    if (error) {
      console.error("Supabase insert error details:", error);
      throw error;
    }

    return { data: data[0] || { referenceNumber } };
  } catch (error: any) {
    console.error("Error submitting form data to Supabase:", error);
    // Create an axios-like error object for backward compatibility with existing UI error handling
    throw {
      response: {
        status: error.code || 500,
        data: { message: error.message || 'Error submitting to Supabase' }
      },
      message: error.message
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { token: data.session?.access_token, user: data.user };
  } catch (error: any) {
    console.error("Supabase Login error:", error);
    throw new Error(error.message || 'Login failed');
  }
};