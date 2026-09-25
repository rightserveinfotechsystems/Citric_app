import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * BulletList — one renderer for all bullet/numbered content screens.
 *
 * items: array of
 *   - string                        → plain bullet row (Genesis style)
 *   - { heading, body }             → heading + paragraph row
 * variant:
 *   - 'plain'     big bullet glyph, bold justified body            (Genesis)
 *   - 'numbered'  "1." glyph + bold heading + justified body       (Criteria For Selection)
 *   - 'heading'   small dot + bold heading + justified paragraph   (Incubation Models)
 */
export function BulletList({ items, variant = 'plain', style }) {
  const s = stylesByVariant[variant] || stylesByVariant.plain;
  return (
    <View style={style}>
      {items.map((item, index) => (
        <View key={index} style={[styles.row, s.row]}>
          <Text style={s.glyph}>{variant === 'numbered' ? `${index + 1}.` : '•'}</Text>
          <View style={styles.textColumn}>
            {item.heading ? <Text style={s.heading}>{item.heading}</Text> : null}
            {item.body ? <Text style={s.body}>{item.body}</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const baseRow = { flexDirection: 'row' };
const baseTextColumn = { flexDirection: 'column', flex: 1 };

const stylesByVariant = {
  plain: StyleSheet.create({
    row: { ...baseRow, width: '90%', marginTop: 10, marginRight: 20 },
    glyph: { fontSize: 40, width: 20, color: 'black', marginTop: -17 },
    heading: {},
    body: { fontSize: 16, fontWeight: '700', color: 'black', textAlign: 'justify' },
  }),
  numbered: StyleSheet.create({
    row: { ...baseRow, width: '85%', marginHorizontal: '5%', marginTop: 10 },
    glyph: { fontSize: 15, width: 22, fontWeight: 'bold', color: 'black' },
    heading: { fontSize: 17, fontWeight: '700', color: 'black' },
    body: { fontSize: 16, fontWeight: '600', color: 'black', textAlign: 'justify', marginBottom: 10 },
  }),
  heading: StyleSheet.create({
    row: { ...baseRow, marginTop: 2 },
    glyph: { fontSize: 28, marginBottom: -15, marginRight: 5 },
    heading: { fontSize: 16, fontWeight: '700', color: 'black', marginTop: 7 },
    body: { fontSize: 15, fontWeight: '600', color: 'black', textAlign: 'justify' },
  }),
};

const styles = StyleSheet.create({
  row: baseRow,
  textColumn: baseTextColumn,
});
