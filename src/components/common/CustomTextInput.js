import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

/**
 * CustomTextInput — visual layer only; the prop contract is unchanged
 * (label, value, onChangeText, placeholder, secureTextEntry, style, onFocus,
 *  onBlur, keyboardType, placeholderFontSize).
 *
 * Modern form styling: soft bordered field, orange focus ring, readable
 * placeholder. Same layout geometry as before (width 90%, centered).
 */
const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  onFocus,
  onBlur,
  keyboardType,
  placeholderFontSize = 16,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus(); // Call external onFocus if provided
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur(); // Call external onBlur if provided
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9E9A94"
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
    marginVertical: 6,
    width: '90%',
    marginHorizontal: '5%',
  },
  label: {
    marginBottom: 6,
    color: '#1F1F1F',
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  input: {
    height: 50,
    borderColor: '#DDD5CC',
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    color: '#1F1F1F',
  },
  inputFocused: {
    borderColor: '#EC7E1C',
    shadowColor: '#EC7E1C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
});

export default CustomTextInput;
