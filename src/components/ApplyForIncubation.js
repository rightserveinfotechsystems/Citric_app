import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Modal, Linking, Platform } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from './common/CustomTextInput';
import moment from 'moment';
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



/** Dependency-free calendar icon (real Views — no icon font, no image asset). */
function CalendarIcon() {
  return (
    <View style={styles.calIcon} accessibilityLabel="Calendar">
      <View style={styles.calTopBar} />
      <View style={styles.calGrid}>
        {[0, 1, 2, 3, 4, 5].map((i) => <View key={i} style={styles.calDot} />)}
      </View>
    </View>
  );
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/** Pure-JS month calendar for the iOS date sheet. UIDatePicker's inline mode collapses
 * inside transparent Modals on modern iOS (renders a single cell), so we render our own
 * grid — deterministic on every iOS version and styled to match the form. */
function MonthGrid({ value, onChange }) {
  const [visible, setVisible] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const startDow = new Date(visible.getFullYear(), visible.getMonth(), 1).getDay();
  const daysInMonth = new Date(visible.getFullYear(), visible.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const isOn = (d) => value.getFullYear() === visible.getFullYear()
    && value.getMonth() === visible.getMonth() && value.getDate() === d;
  const shift = (delta) => setVisible(new Date(visible.getFullYear(), visible.getMonth() + delta, 1));
  return (
    <View>
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={() => shift(-1)} hitSlop={10} accessibilityLabel="Previous month">
          <Text style={styles.monthArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{MONTH_NAMES[visible.getMonth()]} {visible.getFullYear()}</Text>
        <TouchableOpacity onPress={() => shift(1)} hitSlop={10} accessibilityLabel="Next month">
          <Text style={styles.monthArrow}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {weekDays.map((d, i) => <Text key={`w${i}`} style={styles.weekDay}>{d}</Text>)}
      </View>
      <View style={styles.dayGrid}>
        {cells.map((d, i) => (
          <View key={`c${i}`} style={styles.dayCell}>
            {d ? (
              <TouchableOpacity
                onPress={() => onChange(new Date(visible.getFullYear(), visible.getMonth(), d))}
                style={[styles.dayBtn, isOn(d) && styles.dayBtnOn]}
                accessibilityRole="button"
                accessibilityLabel={`${MONTH_NAMES[visible.getMonth()]} ${d}`}
              >
                <Text style={[styles.dayText, isOn(d) && styles.dayTextOn]}>{d}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

/** Dependency-free checkbox (BouncyCheckbox's icon needs vector-icons fonts that Expo
 * prebuild does not bundle here — the box itself never rendered). Same 24x24 footprint. */
function CheckBox({ checked, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.checkBox, checked && styles.checkBoxOn]}
      hitSlop={6}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      {checked ? <Text style={styles.checkMark}>✓</Text> : null}
    </TouchableOpacity>
  );
}

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
  const [iosTempDate, setIosTempDate] = useState(new Date(2000, 0, 1));
  const [iosSheet, setIosSheet] = useState(null); // { title, items, current, onSelect }
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
            {Platform.OS === "android" ? (
              <RNPickerSelect
              onValueChange={handleStateChange}
              items={districtsArray.map((item) => ({
                label: item.state,
                value: item.state,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a State...", value: null }}
            />
            ) : (
              <TouchableOpacity
                style={styles.iosSelectBtn}
                onPress={() => setIosSheet({ title: "Select State", items: districtsArray.map((item) => ({ label: item.state, value: item.state })), current: selectedState, onSelect: handleStateChange })}
              >
                <Text style={selectedState ? styles.dateValue : styles.datePlaceholder}>{selectedState || "Select a State..."}</Text>
                <View style={styles.selectChevron} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.label, { marginLeft: 15, fontWeight: "700" }]}>District*</Text>
<View style={styles.dropDownBox}>
            {Platform.OS === "android" ? (
              <RNPickerSelect
              onValueChange={(value) => setSelectedDistrict(value)}
              items={districts.map((district) => ({
                label: district,
                value: district,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a District...", value: null }}
            />
            ) : (
              <TouchableOpacity
                style={styles.iosSelectBtn}
                onPress={() => setIosSheet({ title: "Select District", items: districts.map((d) => ({ label: d, value: d })), current: selectedDistrict, onSelect: (value) => setSelectedDistrict(value) })}
              >
                <Text style={selectedDistrict ? styles.dateValue : styles.datePlaceholder}>{selectedDistrict || "Select a District..."}</Text>
                <View style={styles.selectChevron} />
              </TouchableOpacity>
            )}
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
              <Text style={styles.checkLabel} onPress={() => handleGenderSelect('Male')}>Male</Text>
              <CheckBox checked={selectedGender === 'Male'} onPress={() => handleGenderSelect('Male')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleGenderSelect('Female')}>Female</Text>
              <CheckBox checked={selectedGender === 'Female'} onPress={() => handleGenderSelect('Female')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleGenderSelect('Other')}>Other</Text>
              <CheckBox checked={selectedGender === 'Other'} onPress={() => handleGenderSelect('Other')} />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={[styles.label]}>6. Date of Birth*</Text>

            {/* B1 port: react-native-woodpicker (unmaintained, breaks on React 19) →
                @react-native-community/datetimepicker (already a dependency, Expo-maintained).
                Identical UX: styled box shows placeholder until a date is chosen; Android opens
                the native dialog; iOS shows the inline calendar. */}
            <TouchableOpacity
              style={[styles.dropDownBox, { width: "100%", marginLeft: -2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}
              onPress={() => {
                if (Platform.OS === "android") {
                  DateTimePickerAndroid.open({
                    value: pickedDOB ? new Date(pickedDOB) : new Date(2000, 0, 1),
                    mode: "date",
                    display: "calendar", // force the calendar view (some devices default to the clock)
                    onValueChange: (_event, date) => { if (date) setPickedDOB(date); },
                  });
                } else {
                  setIosTempDate(pickedDOB ? new Date(pickedDOB) : new Date(2000, 0, 1));
                  setShowDobPicker(true);
                }
              }}
            >
              <Text style={pickedDOB ? styles.dateValue : styles.datePlaceholder}>{handleText()}</Text>
              <CalendarIcon />
            </TouchableOpacity>
            {Platform.OS === "ios" && showDobPicker && (
              <Modal transparent animationType="slide" onRequestClose={() => setShowDobPicker(false)}>
                <View style={styles.pickerBackdrop}>
                  <TouchableOpacity style={styles.pickerBackdropTouch} activeOpacity={1} onPress={() => setShowDobPicker(false)} />
                  <View style={styles.pickerSheet}>
                    <MonthGrid value={iosTempDate} onChange={setIosTempDate} />
                    <View style={styles.pickerSheetButtons}>
                      <TouchableOpacity
                        style={[styles.pickerSheetBtn, styles.pickerSheetBtnCancel]}
                        onPress={() => setShowDobPicker(false)}
                      >
                        <Text style={styles.pickerSheetBtnCancelText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.pickerSheetBtn}
                        onPress={() => { setPickedDOB(iosTempDate); setShowDobPicker(false); }}
                      >
                        <Text style={styles.pickerSheetBtnText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}

            {/* iOS select — our own high-contrast option sheet (system wheel is unreadable) */}
            <Modal visible={!!iosSheet} transparent animationType="slide" onRequestClose={() => setIosSheet(null)}>
              <View style={styles.pickerBackdrop}>
                <TouchableOpacity style={styles.pickerBackdropTouch} activeOpacity={1} onPress={() => setIosSheet(null)} />
                <View style={styles.pickerSheet}>
                  <Text style={styles.sheetTitle}>{iosSheet?.title}</Text>
                  <ScrollView style={styles.sheetList}>
                    {(iosSheet?.items ?? []).map((it, idx) => (
                      <TouchableOpacity
                        key={`${it.value}-${idx}`}
                        style={[styles.sheetOption, iosSheet?.current === it.value && styles.sheetOptionActive]}
                        onPress={() => { iosSheet?.onSelect(it.value); setIosSheet(null); }}
                      >
                        <Text style={[styles.sheetOptionText, iosSheet?.current === it.value && styles.sheetOptionTextActive]}>
                          {it.label}
                        </Text>
                        {iosSheet?.current === it.value ? <Text style={styles.sheetCheck}>✓</Text> : null}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    style={[styles.pickerSheetBtn, styles.pickerSheetBtnCancel, { alignSelf: 'flex-end', marginRight: 8, marginBottom: 2 }]}
                    onPress={() => setIosSheet(null)}
                  >
                    <Text style={styles.pickerSheetBtnCancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
              <Text style={styles.checkLabel} onPress={() => handleCategorySelect('ST')}>ST</Text>
              <CheckBox checked={selectedCategory === 'ST'} onPress={() => handleCategorySelect('ST')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleCategorySelect('SC')}>SC</Text>
              <CheckBox checked={selectedCategory === 'SC'} onPress={() => handleCategorySelect('SC')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleCategorySelect('OBC')}>OBC</Text>
              <CheckBox checked={selectedCategory === 'OBC'} onPress={() => handleCategorySelect('OBC')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleCategorySelect('Gen')}>Gen</Text>
              <CheckBox checked={selectedCategory === 'Gen'} onPress={() => handleCategorySelect('Gen')} />
            </View>
          </View>

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>10. Whether belongs to Below Poverty Line or Differently Abled* </Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handlePovertySelect('Yes')}>Yes</Text>
              <CheckBox checked={selectedPoverty === 'Yes'} onPress={() => handlePovertySelect('Yes')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handlePovertySelect('No')}>No</Text>
              <CheckBox checked={selectedPoverty === 'No'} onPress={() => handlePovertySelect('No')} />
            </View>
          </View>

          {selectedPoverty == "Yes" &&
            <>
              <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>If yes, click on the appropriate box</Text>
              <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
                <View style={styles.row}>
                  <Text style={styles.checkLabel} onPress={() => handlePovertyYesSelect('BPL')}>BPL</Text>
                  <CheckBox checked={selectedPovertyYes === 'BPL'} onPress={() => handlePovertyYesSelect('BPL')} />
                </View>
                <View style={styles.row}>
                  <Text style={styles.checkLabel} onPress={() => handlePovertyYesSelect('DA')}>DA</Text>
                  <CheckBox checked={selectedPovertyYes === 'DA'} onPress={() => handlePovertyYesSelect('DA')} />
                </View>
              </View>
            </>
          }


          <Text style={[styles.label, { marginLeft: 15, fontWeight: "700" }]}>11. Highest Educational Qualification *</Text>
<View style={styles.dropDownBox}>
            {Platform.OS === "android" ? (
              <RNPickerSelect
              onValueChange={(value) => setSelectedEducation(value)}
              items={educationArray}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an option...", value: null }}
            />
            ) : (
              <TouchableOpacity
                style={styles.iosSelectBtn}
                onPress={() => setIosSheet({ title: "Highest Educational Qualification", items: educationArray, current: selectedEducation, onSelect: (value) => setSelectedEducation(value) })}
              >
                <Text style={selectedEducation ? styles.dateValue : styles.datePlaceholder}>{selectedEducation || "Select an option..."}</Text>
                <View style={styles.selectChevron} />
              </TouchableOpacity>
            )}
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
            {Platform.OS === "android" ? (
              <RNPickerSelect
              onValueChange={(value) => setSelectedOccupation(value)}
              items={occupationArray}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an option...", value: null }}
            />
            ) : (
              <TouchableOpacity
                style={styles.iosSelectBtn}
                onPress={() => setIosSheet({ title: "Present Occupation", items: occupationArray, current: selectedOccupation, onSelect: (value) => setSelectedOccupation(value) })}
              >
                <Text style={selectedOccupation ? styles.dateValue : styles.datePlaceholder}>{selectedOccupation || "Select an option..."}</Text>
                <View style={styles.selectChevron} />
              </TouchableOpacity>
            )}
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
              <CheckBox checked={!!selectedRequired['Shoot-tip Grafting (STG)']} onPress={() => handleRequiredSelect('Shoot-tip Grafting (STG)')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Shoot-tip Grafting (STG)')}>Shoot-tip Grafting (STG)</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Micro-budding']} onPress={() => handleRequiredSelect('Micro-budding')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Micro-budding')}>Micro-budding</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Containerized Nursery Technique']} onPress={() => handleRequiredSelect('Containerized Nursery Technique')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Containerized Nursery Technique')}>Containerized Nursery Technique</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Retrofitting Nursery Technique']} onPress={() => handleRequiredSelect('Retrofitting Nursery Technique')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Retrofitting Nursery Technique')}>Retrofitting Nursery Technique</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Commercial Citrus Production']} onPress={() => handleRequiredSelect('Commercial Citrus Production')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Commercial Citrus Production')}>Commercial Citrus Production</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Trichoderma Bioformulation Production']} onPress={() => handleRequiredSelect('Trichoderma Bioformulation Production')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Trichoderma Bioformulation Production')}>Trichoderma Bioformulation Production</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Mallada desjardensi Bioagent Production']} onPress={() => handleRequiredSelect('Mallada desjardensi Bioagent Production')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Mallada desjardensi Bioagent Production')}>Mallada desjardensi Bioagent Production</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Citrus Post-harvest Management']} onPress={() => handleRequiredSelect('Citrus Post-harvest Management')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Citrus Post-harvest Management')}>Citrus Post-harvest Management </Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['Citrus Processing and Value-addition']} onPress={() => handleRequiredSelect('Citrus Processing and Value-addition')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('Citrus Processing and Value-addition')}>Citrus Processing and Value-addition</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedRequired['I have my own business idea / prototype']} onPress={() => handleRequiredSelect('I have my own business idea / prototype')} />
              <Text style={styles.checkLabel} onPress={() => handleRequiredSelect('I have my own business idea / prototype')}>I have my own business idea / prototype</Text>
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
              <CheckBox checked={!!selectedExpected['Technology transfer including guidance in setting up the production/processing facility']} onPress={() => handleExpectedSelect('Technology transfer including guidance in setting up the production/processing facility')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Technology transfer including guidance in setting up the production/processing facility')}>Technology transfer including guidance in setting up the production/processing facility</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Capacity building and skill development']} onPress={() => handleExpectedSelect('Capacity building and skill development')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Capacity building and skill development')}>Capacity building and skill development</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Scientific mentoring and technical consultancy']} onPress={() => handleExpectedSelect('Scientific mentoring and technical consultancy')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Scientific mentoring and technical consultancy')}>Scientific mentoring and technical consultancy</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Preparation of business plan and/or techno-feasibility report']} onPress={() => handleExpectedSelect('Preparation of business plan and/or techno-feasibility report')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Preparation of business plan and/or techno-feasibility report')}>Preparation of business plan and/or techno-feasibility report</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Access to citrus processing plant']} onPress={() => handleExpectedSelect('Access to citrus processing plant')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Access to citrus processing plant')}>Access to citrus processing plant </Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Analytical services']} onPress={() => handleExpectedSelect('Analytical services')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Analytical services')}>Analytical services</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Prototype testing, validation and refinement for citrus-based food products']} onPress={() => handleExpectedSelect('Prototype testing, validation and refinement for citrus-based food products')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Prototype testing, validation and refinement for citrus-based food products')}>Prototype testing, validation and refinement for citrus-based food products</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Support in developing citrus-based food products or processes']} onPress={() => handleExpectedSelect('Support in developing citrus-based food products or processes')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Support in developing citrus-based food products or processes')}>Support in developing citrus-based food products or processes</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Guidance in implementing eco-friendly and sustainable practices in the citrus domain']} onPress={() => handleExpectedSelect('Guidance in implementing eco-friendly and sustainable practices in the citrus domain')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Guidance in implementing eco-friendly and sustainable practices in the citrus domain')}>Guidance in implementing eco-friendly and sustainable practices in the citrus domain</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Assistance related to IP protection']} onPress={() => handleExpectedSelect('Assistance related to IP protection')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Assistance related to IP protection')}>Assistance related to IP protection</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Support in developing effective sales strategies']} onPress={() => handleExpectedSelect('Support in developing effective sales strategies')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Support in developing effective sales strategies')}>Support in developing effective sales strategies</Text>
            </View>
            <View style={[styles.row, { marginLeft: 20 }]}>
              <CheckBox checked={!!selectedExpected['Logo designing and brand building']} onPress={() => handleExpectedSelect('Logo designing and brand building')} />
              <Text style={styles.checkLabel} onPress={() => handleExpectedSelect('Logo designing and brand building')}>Logo designing and brand building</Text>
            </View>
          </View>

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>15. Mode of Incubation</Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 5 }]}>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleModeSelect('On-site')}>On-site</Text>
              <CheckBox checked={selectedMode === 'On-site'} onPress={() => handleModeSelect('On-site')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleModeSelect('Off-site')}>Off-site</Text>
              <CheckBox checked={selectedMode === 'Off-site'} onPress={() => handleModeSelect('Off-site')} />
            </View>
          </View>

          <Text style={[styles.label, { marginLeft: 18, fontWeight: "700" }]}>16. Duration of Incubation</Text>
          <View style={[styles.row, { marginLeft: 25, marginTop: 10, marginBottom: 10 }]}>
            <View style={[styles.row]}>
              <Text style={styles.checkLabel} onPress={() => handleDurationSelect('Up to 6 months')}>Upto 6 months  </Text>
              <CheckBox checked={selectedDuration === 'Up to 6 months'} onPress={() => handleDurationSelect('Up to 6 months')} />
            </View>
            <View style={styles.row}>
              <Text style={styles.checkLabel} onPress={() => handleDurationSelect('Up to 1 year')}>Upto 1 year</Text>
              <CheckBox checked={selectedDuration === 'Up to 1 year'} onPress={() => handleDurationSelect('Up to 1 year')} />
            </View>

          </View>
          <View style={[styles.row, { marginLeft: 20 }]}>
            <CheckBox checked={selectAgree} onPress={handleSelectAgree} />
            <Text style={styles.checkLabel} onPress={handleSelectAgree}>I hereby state that the above mentioned particulars are true, to the best of my/our knowledge. I also state that no relevant material fact has been suppressed while applying for enrollment in the CitriHub, ICAR-CCRI. I am aware of all the provisions given under the incubation process and abide by the decisions taken by CitriHub, ICAR-CCRI.
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
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD5CC',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  iosSelectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    minHeight: 46,
  },
  selectChevron: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#6B6B6B',
    marginLeft: 8,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F1F1F',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  sheetList: {
    maxHeight: 420,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEEEEE',
  },
  sheetOptionActive: {
    backgroundColor: '#FDF1E7',
  },
  sheetOptionText: {
    fontSize: 16,
    color: '#1F1F1F',
    flexShrink: 1,
  },
  sheetOptionTextActive: {
    color: '#EC7E1C',
    fontWeight: '800',
  },
  sheetCheck: {
    color: '#EC7E1C',
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 10,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  monthArrow: {
    fontSize: 26,
    lineHeight: 30,
    color: '#1F1F1F',
    paddingHorizontal: 10,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F1F1F',
  },
  weekRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#8A8A8A',
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    marginVertical: 2,
    height: 38,
    justifyContent: 'center',
  },
  dayBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBtnOn: {
    backgroundColor: '#EC7E1C',
  },
  dayText: {
    fontSize: 15,
    color: '#1F1F1F',
  },
  dayTextOn: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  pickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  pickerBackdropTouch: {
    flex: 1,
  },
  pickerSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  pickerSheetButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  pickerSheetBtn: {
    backgroundColor: '#EC7E1C',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  pickerSheetBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  pickerSheetBtnCancel: {
    backgroundColor: '#F1EDE8',
  },
  pickerSheetBtnCancelText: {
    color: '#444444',
    fontWeight: '700',
    fontSize: 15,
  },
  dateValue: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  datePlaceholder: {
    fontSize: 16,
    color: '#9E9A94',
  },
  calIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#EC7E1C',
    backgroundColor: '#FFFFFF',
  },
  calTopBar: {
    height: 5,
    backgroundColor: '#EC7E1C',
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 3,
    paddingHorizontal: 2,
  },
  calDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#EC7E1C',
    margin: 1,
  },
  checkLabel: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1F1F1F',
    flexShrink: 1,
    marginLeft: 10,
    marginRight: 12,
    marginTop: 0,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#B9B0A6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkBoxOn: {
    backgroundColor: '#EC7E1C',
    borderColor: '#EC7E1C',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  squareCheckbox: {
    borderRadius: 6, // kept for any residual styling references
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
  // The wrapping `dropDownBox` View provides the border/background/rounded chrome —
  // the picker itself must stay transparent, otherwise two boxes stack (Android overlap).
  inputIOS: {
    fontSize: 16,
    minHeight: 46,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#1F1F1F',
  },
  iconContainer: {
    right: 14,
    top: 15,
    color: '#6B6B6B',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#1F1F1F',
    width: '100%',
  },
  placeholder: {
    color: '#6B6B6B',
  },
});
