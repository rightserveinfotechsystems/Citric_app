import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

const CustomTextInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  style, 
  onFocus, 
  onBlur ,
  keyboardType,
  placeholderFontSize = 16
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();  // Call external onFocus if provided
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();  // Call external onBlur if provided
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="black"
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        style={[styles.input, isFocused && styles.inputFocused, { fontSize: placeholderFontSize }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: "90%",
    marginHorizontal: "5%"
  },
  label: {
    marginBottom: 5,
    color: 'black',
    fontSize: 19,
    fontWeight: '800',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    // borderRadius: 10,
    color: "black"
  },
  inputFocused: {
    borderColor: 'orange',  // Change the color to orange when focused
    color: "black"
  },
});

export default CustomTextInput;
