import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

/**
 * App-wide keyboard handling wrapper so input fields are never hidden behind
 * the on-screen keyboard.
 *
 * Usage — wrap the scrollable body of a screen (keep fixed headers OUTSIDE):
 *   <KeyboardAware contentContainerStyle={styles.body}>
 *     ...form fields...
 *   </KeyboardAware>
 *
 * On iOS it pads the view; on Android it shrinks the view (adjustResize is
 * unreliable on some devices, so we handle it in JS). The inner ScrollView lets
 * the focused field scroll above the keyboard, and keyboardShouldPersistTaps
 * keeps buttons tappable while the keyboard is open.
 */
export default function KeyboardAware({
  children,
  style,
  contentContainerStyle,
  keyboardVerticalOffset = 0,
  scroll = true,
}) {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {scroll ? (
        <ScrollView
          contentContainerStyle={[{ flexGrow: 1, paddingBottom: 30 }, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </KeyboardAvoidingView>
  );
}
