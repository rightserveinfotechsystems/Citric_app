import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Modal, Linking, Platform } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from './common/CustomTextInput';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { communication } from '../services/communication';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { educationArray } from '../utils/educationArray';
import { occupationArray } from '../utils/occupationArray';
import { convertDate } from '../utils/convertDate';

const BACKGROUND = require('../assets/AppBackground.jpg');
import { districtsArray } from './common/districtsArray';
import { stateArray } from './common/stateArray';



export default function ApplyForIncubation() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loader, setLoader] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null); // "Male" or "Female"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPoverty, setSelectedPoverty] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [selectedPovertyYes, setSelectedPovertyYes] = useState(null);
  const [selectedExpected, setSelectedExpected] = useState({
    transfer: false,
    building: false,
    mentoring: false,
    businessplan: false,
    citrusprocessing: false,
    services: false,
    foodproducts: false,
    citrusbased: false,
    ecofriendly: false,
    IPprotection: false,
    designing: false,
  });
  const [selectedRequired, setSelectedRequired] = useState({
    shootTrip: false,
    microBudding: false,
    nurseryTechnique: false,
    nurseryRetro: false,
    citrusProduction: false,
    bioformulation: false,
    bioagent: false,
    harvest: false,
    valueAddition: false,
    prototype: false,
  });

  const [pickedDOB, setPickedDOB] = useState("");
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectAgree, setSelectAgree] = useState(false);

  const handleSelectAgree = () => {
    setSelectAgree(prev => !prev); // Toggles the checkbox state
  };


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);


  const openModal = () => setModalVisible(true);
  const openModal2 = () => setModalVisible2(true);
  const closeModal = () => setModalVisible(false);
  const closeModal2 = () => setModalVisible2(false);



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const navigation = useNavigation()

  const handleText = () => pickedDOB ? moment(pickedDOB).format('DD-MM-YYYY') : 'dd-mm-yyyy';

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode === selectedMode ? null : mode);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration === selectedDuration ? null : duration);
  };
  const handlePovertySelect = (poverty) => {
    setSelectedPoverty(poverty === selectedPoverty ? null : poverty);
  };

  const handlePovertyYesSelect = (povertyYes) => {
    setSelectedPovertyYes(povertyYes === selectedPovertyYes ? null : povertyYes);
  };

  const handleExpectedSelect = (interest) => {
    setSelectedExpected((prevInterests) => ({
      ...prevInterests,
      [interest]: !prevInterests[interest],
    }));
  };

  const handleRequiredSelect = (interest) => {
    setSelectedRequired((prevInterests) => ({
      ...prevInterests,
      [interest]: !prevInterests[interest],
    }));
  };


  const submitForms = async (data) => {
    // Prepare the interests as an array of selected items
    const selectedExpectedArray = Object.keys(selectedExpected).filter(
      (key) => selectedExpected[key]
    );
    const selectedRequiredArray = Object.keys(selectedRequired).filter(
      (key) => selectedRequired[key]
    );

    if (selectedState == "") {
      Alert.alert("Please select state")
      return;
    }
    // Check if at least gender or one interest is selected
    if (!selectedGender) {
      Alert.alert('Please select gender');
      return;
    }

    if (selectedEducation == "") {
      Alert.alert('Please select highest educational qualification');
      return;
    }
    if (selectedOccupation == "") {
      Alert.alert('Please select Occupation');
      return;
    }
    if (pickedDOB == "") {
      Alert.alert('Please select DOB');
      return;
    }
    if (selectAgree == false) {
      Alert.alert("Please agree terms and condition to continue.")
      return;
    }

    try {
      setLoader(true);
      let responseFromServer = null;
      const dataToSend = {
        personalDetails: {
          name: data.name,
          address: data.address,
          city_PostOffice: data.city,
          district: selectedDistrict,
          state: selectedState,
          pinCode: data.pincode,
          mobileNumber: data.mobile,
          emailId: data.email,
          gender: selectedGender,
          dob: convertDate(pickedDOB),
          pan: data.panNo,
          aadhaarNumber: data.aadhaarNumber,
          category: selectedCategory,
          bplOrDaStatus: selectedPoverty,
          bplOrDaType: selectedPovertyYes
        },
        educationalDetails: {
          highEducationQualification: selectedEducation,
          disciplineForQualification: data.disciplineForQualification,
          certificateDetails: data.certificateDetails,
        },
        occupationDetails: {
          presentOccupation: selectedOccupation,
          specifyNature: data.otherOccupation,
          registrationNumber: data.otherOccupationNo,
        },
        // stateDetails: {
        //   presentState: selectedState,
        // },
        otherDetails: {
          areaOfIncubation: selectedRequiredArray,
          describeIdea: data.businessIdea,
          incubationServices: selectedExpectedArray,
          modeOfIncubation: selectedMode,
          durationOfIncubation: selectedDuration,
        }
      }

      console.log('jbkhvgj', dataToSend);

      responseFromServer = await communication.submitForm(dataToSend);

      if (responseFromServer?.data?.status === "SUCCESS") {
        Alert.alert("Congratulations", "Your application has been successfully submitted. CitriHub will contact you soon.");
        navigation.navigate("Home")

      } else {
        Alert.alert(responseFromServer?.data?.message);
      }
      setLoader(false);
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error.message);
      setLoader(false);
    }



  };
  const handleStateChange = (value) => {
    setSelectedState(value);
    const stateData = districtsArray.find((item) => item.state === value);
    setDistricts(stateData ? stateData.districts : []);
  };
  return (
    <ScreenShell
      title="Apply For Incubation"
      background={BACKGROUND}
      keyboardAvoiding
    >

      {/* Helper banner — same fields, same validation; just easier to follow */}
      <View style={styles.introCard}>
        <Text style={styles.introText}>
          Fill in all fields marked * — your application goes straight to the CitriHub team.
        </Text>
      </View>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="1. Name*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Name"
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          <Controller
            control={control}
            name="address"
            rules={{ required: 'Address is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="2. Address*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Address"
              />
            )}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}


          <Controller
            control={control}
            name="city"
            rules={{ required: 'City / Post Office is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="City / Post Office*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter City / Post Office"
              />
            )}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}

          <Text style={[styles.label, { marginLeft: 15, fontWeight: "700" }]}>State*</Text>
          <View style={styles.dropDownBox}>
            <RNPickerSelect
              // rules={{ required: 'State is required' }}
              onValueChange={handleStateChange}
              items={districtsArray.map((item) => ({
                label: item.state,
                value: item.state,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a State...", value: null }}
            />
          </View>
          <Text style={[styles.label, { marginLeft: 15, fontWeight: "700" }]}>District*</Text>
          <View style={styles.dropDownBox}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedDistrict(value)}
              items={districts.map((district) => ({
                label: district,
                value: district,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a District...", value: null }}
            />
          </View>

          <Controller
            control={control}
            name="pincode"
            rules={{ required: 'Pincode is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Pincode*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric" // Ensures only numeric input
                placeholder="Enter Pincode"
              />
            )}
          />
          {errors.pincode && <Text style={styles.errorText}>{errors.pincode.message}</Text>}
          <Controller
            control={control}
            name="mobile"
            rules={{
              required: 'Mobile Number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="3. Mobile Number*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Mobile Number"
                keyboardType="numeric" // Ensures only numeric input
                maxLength={10} // Limits input to 10 characters
              />
            )}
          />
          {errors.mobile && <Text style={styles.errorText}>{errors.mobile.message}</Text>}

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email ID is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="4. Email ID*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Email ID"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <Text style={[styles.label, { marginLeft: 18 }]}>5. Gender</Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>Male</Text>
              <BouncyCheckbox
                isChecked={selectedGender === 'Male'}
                text="Male"
                onPress={() => handleGenderSelect('Male')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Female</Text>
              <BouncyCheckbox
                isChecked={selectedGender === 'Female'}
                text="Female"
                onPress={() => handleGenderSelect('Female')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Other</Text>
              <BouncyCheckbox
                isChecked={selectedGender === 'Other'}
                text="Other"
                onPress={() => handleGenderSelect('Other')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={[styles.label]}>6. Date of Birth*</Text>

            {/* B1 port: react-native-woodpicker (unmaintained, breaks on React 19) →
                @react-native-community/datetimepicker (already a dependency, Expo-maintained).
                Identical UX: styled box shows placeholder until a date is chosen; Android opens
                the native dialog; iOS shows the inline calendar. */}
            <TouchableOpacity
              style={[styles.dropDownBox, { width: "100%", marginLeft: -2, justifyContent: "center" }]}
              onPress={() => {
                if (Platform.OS === "android") {
                  DateTimePickerAndroid.open({
                    value: pickedDOB ? new Date(pickedDOB) : new Date(2000, 0, 1),
                    mode: "date",
                    onChange: (_event, date) => { if (date) setPickedDOB(date); },
                  });
                } else {
                  setShowDobPicker(true);
                }
              }}
            >
              <Text>{handleText()}</Text>
            </TouchableOpacity>
            {Platform.OS === "ios" && showDobPicker && (
              <DateTimePicker
                value={pickedDOB ? new Date(pickedDOB) : new Date(2000, 0, 1)}
                mode="date"
                display="inline"
                onChange={(_event, date) => { if (date) setPickedDOB(date); }}
              />
            )}
            {/* </View> */}

          </View>

          <Controller
            control={control}
            name="panNo"
            // rules={{ required: 'PAN is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="7. Permanent Account Number (PAN), if available"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter PAN"
              />
            )}
          />
          {/* {errors.panNo && <Text style={styles.errorText}>{errors.panNo.message}</Text>} */}

          <Controller
            control={control}
            name="aadhaarNumber"
            rules={{ required: 'Aadhaar Number* is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="8. Aadhaar Number*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric" // Ensures only numeric input
                placeholder="Enter Aadhaar Number*"
              />
            )}
          />
          {errors.aadhaarNumber && <Text style={styles.errorText}>{errors.aadhaarNumber.message}</Text>}

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>9. Category</Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>ST</Text>
              <BouncyCheckbox
                isChecked={selectedCategory === 'ST'}
                text="ST"
                onPress={() => handleCategorySelect('ST')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>SC</Text>
              <BouncyCheckbox
                isChecked={selectedCategory === 'SC'}
                text="SC"
                onPress={() => handleCategorySelect('SC')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>OBC</Text>
              <BouncyCheckbox
                isChecked={selectedCategory === 'OBC'}
                text="OBC"
                onPress={() => handleCategorySelect('OBC')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Gen</Text>
              <BouncyCheckbox
                isChecked={selectedCategory === 'Gen'}
                text="Gen"
                onPress={() => handleCategorySelect('Gen')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
          </View>

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>10. Whether belongs to Below Poverty Line or Differently Abled* </Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>Yes</Text>
              <BouncyCheckbox
                isChecked={selectedPoverty === 'Yes'}
                text="Yes"
                onPress={() => handlePovertySelect('Yes')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>No</Text>
              <BouncyCheckbox
                isChecked={selectedPoverty === 'No'}
                text="No"
                onPress={() => handlePovertySelect('No')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
          </View>

          {selectedPoverty == "Yes" &&
            <>
              <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>If yes, click on the appropriate box</Text>
              <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
                <View style={styles.row}>
                  <Text style={styles.label}>BPL</Text>
                  <BouncyCheckbox
                    isChecked={selectedPovertyYes === 'BPL'}
                    text="BPL"
                    onPress={() => handlePovertyYesSelect('BPL')}
                    fillColor="#EC7E1C"
                    style={{ marginLeft: 10, marginTop: 7 }}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>DA</Text>
                  <BouncyCheckbox
                    isChecked={selectedPovertyYes === 'DA'}
                    text="DA"
                    onPress={() => handlePovertyYesSelect('DA')}
                    fillColor="#EC7E1C"
                    style={{ marginLeft: 10, marginTop: 7 }}
                  />
                </View>
              </View>
            </>
          }


          <Text style={[styles.label, { marginLeft: 15, fontWeight: "700" }]}>11. Highest Educational Qualification *</Text>
          <View style={styles.dropDownBox}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedEducation(value)}
              items={educationArray}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an option...", value: null }}
            />
          </View>
          {/* {errors.district && <Text style={styles.errorText}>{errors.district.message}</Text>} */}

          {["Higher-secondary", "Graduate", "Post-graduate", "Doctorate", "Certificate/Diploma"].includes(selectedEducation) && (
            <Controller
              control={control}
              name="disciplineForQualification"
              rules={{ required: "Please specify the details" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Please specify the details"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter Discipline"
                />
              )}
            />
          )}
          {errors.disciplineForQualification && <Text style={styles.errorText}>{errors.disciplineForQualification.message}</Text>}

          <Text style={[styles.label, { marginLeft: 15, fontWeight: "700" }]}>12. Present Occupation*</Text>
          <View style={styles.dropDownBox}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedOccupation(value)}
              items={occupationArray}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an option...", value: null }}
            />
          </View>

          {selectedOccupation === "Farmer" &&
            <Controller
              control={control}
              name="otherOccupation"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="If Farmer, please specify the major activities"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}

                />
              )}
            />
          }


          {["Entrepreneur-Agri", "Entreprneur-Non-agri"].includes(selectedOccupation) &&
            <>
              <Controller
                control={control}
                name="otherOccupation"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="If Entrepreneur, please specify the nature of business "
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
              <Controller
                control={control}
                name="otherOccupationNo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="Registration number, if registered "
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
            </>
          }
          {selectedOccupation === "SHGorSociety" &&
            <>
              <Controller
                control={control}
                name="otherOccupation"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="If SHG or Society, please specify the nature of activities"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
              <Controller
                control={control}
                name="otherOccupationNo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="Registration Number, if registered"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
            </>
          }

          {selectedOccupation === "FPO/FPC" &&
            <>
              <Controller
                control={control}
                name="otherOccupation"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="If FPO/FPC, please specify the nature of activities / business "
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
              <Controller
                control={control}
                name="otherOccupationNo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="Corporate Identification Number, if registered"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
            </>
          }

          {selectedOccupation === "Startup-Registred" &&
            <>
              <Controller
                control={control}
                name="otherOccupation"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="If Startup, please specify the nature of activities / business "
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
              <Controller
                control={control}
                name="otherOccupationNo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="Startup Registration Number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                  />
                )}
              />
            </>
          }

          {selectedOccupation === "Other" &&
            <Controller
              control={control}
              name="otherOccupation"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="If Other, please specify the nature of job"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}

                />
              )}
            />
          }


          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>13. Area of Incubation Required</Text>
          <View style={{ flexDirection: "column" }}>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.shootTrip}
                // text="Music"
                onPress={() => handleRequiredSelect('Shoot-tip Grafting (STG)')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Shoot-tip Grafting (STG)</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.microBudding}
                text="Sports"
                onPress={() => handleRequiredSelect('Micro-budding')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Micro-budding</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.nurseryTechnique}
                text="Reading"
                onPress={() => handleRequiredSelect('Containerized Nursery Technique')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Containerized Nursery Technique</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.nurseryRetro}
                // text="Music"
                onPress={() => handleRequiredSelect('Retrofitting Nursery Technique')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Retrofitting Nursery Technique</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.citrusProduction}
                text="Sports"
                onPress={() => handleRequiredSelect('Commercial Citrus Production')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Commercial Citrus Production</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.bioformulation}
                text="Reading"
                onPress={() => handleRequiredSelect('Trichoderma Bioformulation Production')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={[styles.label,{width: "80%"}]}>Trichoderma Bioformulation Production</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.bioagent}
                // text="Music"
                onPress={() => handleRequiredSelect('Mallada desjardensi Bioagent Production')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={[styles.label,{width: "80%"}]}>Mallada desjardensi Bioagent Production</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.harvest}
                text="Sports"
                onPress={() => handleRequiredSelect('Citrus Post-harvest Management')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Citrus Post-harvest Management </Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.valueAddition}
                text="Reading"
                onPress={() => handleRequiredSelect('Citrus Processing and Value-addition')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Citrus Processing and Value-addition</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedRequired.prototype}
                text="Reading"
                onPress={() => handleRequiredSelect('I have my own business idea / prototype')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={[styles.label,{width: "80%"}]}>I have my own business idea / prototype</Text>
            </View>
          </View>
          <Controller
            control={control}
            name="businessIdea"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="If own business idea / prototype, briefly describe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}

              />
            )}
          />


          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>14. Incubation Services Expected</Text>
          <View style={{ flexDirection: "column", marginRight: 50 }}>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.transfer}
                // text="Music"
                onPress={() => handleExpectedSelect('Technology transfer including guidance in setting up the production/processing facility')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Technology transfer including guidance in setting up the production/processing facility</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.building}
                text="Sports"
                onPress={() => handleExpectedSelect('Capacity building and skill development')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Capacity building and skill development</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.mentoring}
                text="Reading"
                onPress={() => handleExpectedSelect('Scientific mentoring and technical consultancy')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Scientific mentoring and technical consultancy</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.businessplan}
                // text="Music"
                onPress={() => handleExpectedSelect('Preparation of business plan and/or techno-feasibility report')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Preparation of business plan and/or techno-feasibility report</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.citrusprocessing}
                text="Sports"
                onPress={() => handleExpectedSelect('Access to citrus processing plant')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Access to citrus processing plant </Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.services}
                text="Reading"
                onPress={() => handleExpectedSelect('Analytical services')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Analytical services</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.foodproducts}
                // text="Music"
                onPress={() => handleExpectedSelect('Prototype testing, validation and refinement for citrus-based food products')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Prototype testing, validation and refinement for citrus-based food products</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.citrusbased}
                text="Sports"
                onPress={() => handleExpectedSelect('Support in developing citrus-based food products or processes')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Support in developing citrus-based food products or processes</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.ecofriendly}
                text="Reading"
                onPress={() => handleExpectedSelect('Guidance in implementing eco-friendly and sustainable practices in the citrus domain')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Guidance in implementing eco-friendly and sustainable practices in the citrus domain</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.IPprotection}
                text="Reading"
                onPress={() => handleExpectedSelect('Assistance related to IP protection')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Assistance related to IP protection</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.developing}
                text="Sports"
                onPress={() => handleExpectedSelect('Support in developing effective sales strategies')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Support in developing effective sales strategies</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <BouncyCheckbox
                isChecked={selectedExpected.designing}
                text="Sports"
                onPress={() => handleExpectedSelect('Logo designing and brand building')}
                fillColor="#EC7E1C" iconStyle={styles.squareCheckbox}
              />
              <Text style={styles.label}>Logo designing and brand building</Text>
            </View>
          </View>

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>15. Mode of Incubation</Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
            <View style={styles.row}>
              <Text style={styles.label}>On-site</Text>
              <BouncyCheckbox
                isChecked={selectedMode === 'On-site'}
                text="On-site"
                onPress={() => handleModeSelect('On-site')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Off-site</Text>
              <BouncyCheckbox
                isChecked={selectedMode === 'Off-site'}
                text="Off-site"
                onPress={() => handleModeSelect('Off-site')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10, marginTop: 7 }}
              />
            </View>
          </View>

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>16. Duration of Incubation</Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 10 }]}>
            <View style={[styles.row]}>
              <Text style={styles.label}>Upto 6 months  </Text>
              <BouncyCheckbox
                isChecked={selectedDuration === 'Up to 6 months'}
                text="Upto 6 months"
                onPress={() => handleDurationSelect('Up to 6 months')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10 }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Upto 1 year</Text>
              <BouncyCheckbox
                isChecked={selectedDuration === 'Up to 1 year'}
                text="Upto 1 year"
                onPress={() => handleDurationSelect('Up to 1 year')}
                fillColor="#EC7E1C"
                style={{ marginLeft: 10 }}
              />
            </View>

          </View>
          <View style={[styles.row, { marginLeft: 20 }]}>
            <BouncyCheckbox
              isChecked={selectAgree}
              text="Agree"
              onPress={handleSelectAgree}
              fillColor="#EC7E1C"
              style={{ marginTop: -155 }}
            />
            <Text style={[styles.label, { width: "80%" }]}>I hereby state that the above mentioned particulars are true, to the best of my/our knowledge. I also state that no relevant material fact has been suppressed while applying for enrollment in the CitriHub, ICAR-CCRI. I am aware of all the provisions given under the incubation process and abide by the decisions taken by CitriHub, ICAR-CCRI.
            </Text>
          </View>
          <View style={{ flexDirection: "row", width: "70%" }}>
            <TouchableOpacity onPress={() => Linking.openURL("https://citrihub.liveprosolutions.com/term-conditions")}>
              <Text style={[styles.label, { fontSize: 15, marginTop: 0, color: 'blue', textDecorationLine: 'underline', marginLeft: 50 }]}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://citrihub.liveprosolutions.com/privacy-policy")}>
              <Text style={[styles.label, { fontSize: 15, marginTop: 0, color: 'blue', textDecorationLine: 'underline', marginLeft: 10 }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitBox} onPress={handleSubmit(submitForms)}>
            {loader ? <ActivityIndicator size="small" style={[styles.submitText, { marginTop: 5 }]} color="white" /> : <Text style={styles.submitText}>Apply</Text>}
          </TouchableOpacity>
    </ScreenShell>
  );
}


/* ── Form styles (modernized visuals — same fields, same logic, same validation) ── */

const styles = StyleSheet.create({
  introCard: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EC7E1C',
  },
  introText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#444444',
    lineHeight: 20,
  },
  label: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 16,
    marginBottom: 7,
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1F1F1F',
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
  },
  inputBox: {
    width: '90%',
    marginHorizontal: '5%',
  },
  dropDownBox: {
    width: '90%',
    marginHorizontal: '5%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD5CC',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  squareCheckbox: {
    borderRadius: 6, // softened square
    width: 24,
    height: 24,
  },
  errorText: {
    color: '#D21B16',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: '5%',
    marginTop: 4,
  },
  submitBox: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 28,
    marginBottom: 24,
    height: 54,
    backgroundColor: '#EC7E1C',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#DDD5CC',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#1F1F1F',
    marginTop: 4,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#DDD5CC',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#1F1F1F',
    marginTop: 4,
  },
  placeholder: {
    color: '#9E9A94',
  },
});
