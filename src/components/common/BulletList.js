import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * BulletList — one renderer for all bullet/numbered content screens.
 *
 * items: array of
 *   - string                        → plain bullet row, rendered with the `body` style
 *                                     (Genesis — the string is the whole row text)
 *   - { heading, body }             → heading + paragraph row
 * variant:
 *   - 'plain'     rounded-dot bullet + bold justified body          (Genesis)
 *   - 'numbered'  "1." + bold heading + justified body              (Criteria For Selection)
 *   - 'heading'   small rounded-dot + bold heading + paragraph      (Incubation Models)
 *
 * CROSS-PLATFORM NOTE (iOS + Android, all devices/font scales):
 * Bullets are real `View` circles — NOT text glyphs ("•") with negative margins.
 * Text-glyph bullets render in the platform font (Roboto vs SF Pro), whose different
 * line-height metrics make negative-margin offsets land correctly on one platform and
 * overlap/float on the other; a 40pt glyph inside a fixed 20pt box additionally clips
 * on Android. View dots + explicit `lineHeight`s make the alignment pure arithmetic
 * (dot top = (lineHeight − dotSize) / 2) — identical on every device and immune to
 * OS font-size accessibility settings.
 */

const BODY_LINE_HEIGHT = 23; // first-line vertical center = 11.5
const HEADING_LINE_HEIGHT = 24;

export function BulletList({ items, variant = 'plain', style }) {
  const s = stylesByVariant[variant] || stylesByVariant.plain;
  return (
    <View style={style}>
      {items.map((item, index) => {
        // A plain string (Genesis) is shorthand for { body: item } — one render path
        // for every input shape, so no row can ever come out empty.
        const row = typeof item === 'string' ? { body: item } : item;
        return (
          <View key={index} style={[styles.row, s.row]}>
            {variant === 'numbered' ? (
              <Text style={s.marker}>{`${index + 1}.`}</Text>
            ) : (
              <View style={styles.markerBox}>
                <View style={s.dot} />
              </View>
            )}
            <View style={styles.textColumn}>
              {row?.heading ? <Text style={s.heading}>{row.heading}</Text> : null}
              {row?.body ? <Text style={s.body}>{row.body}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const baseRow = { flexDirection: 'row' };
const baseTextColumn = { flexDirection: 'column', flex: 1 };

const stylesByVariant = {
  plain: StyleSheet.create({
    row: { ...baseRow, width: '90%', maxWidth: 560, marginTop: 10 },
    // body lineHeight 23 → first-line center 11.5 → dot 9px at marginTop 7
    dot: {
      width: 9,
      height: 9,
      borderRadius: 4.5,
      backgroundColor: '#1A1A1A',
      marginTop: 7,
    },
    heading: {},
    body: {
      fontSize: 16,
      lineHeight: BODY_LINE_HEIGHT,
      fontWeight: '700',
      color: 'black',
      textAlign: 'justify',
    },
  }),
  numbered: StyleSheet.create({
    row: { ...baseRow, width: '85%', maxWidth: 560, marginHorizontal: '5%', marginTop: 10 },
    // marker and heading share lineHeight 24 → their first lines align on both platforms
    marker: {
      fontSize: 15,
      lineHeight: HEADING_LINE_HEIGHT,
      width: 26,
      fontWeight: 'bold',
      color: 'black',
    },
    heading: {
      fontSize: 17,
      lineHeight: HEADING_LINE_HEIGHT,
      fontWeight: '700',
      color: 'black',
    },
    body: {
      fontSize: 16,
      lineHeight: BODY_LINE_HEIGHT,
      fontWeight: '600',
      color: 'black',
      textAlign: 'justify',
      marginBottom: 10,
    },
  }),
  heading: StyleSheet.create({
    row: { ...baseRow, marginTop: 2 },
    // heading lineHeight 23 → dot 7px at marginTop 8
    dot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      backgroundColor: '#1A1A1A',
      marginTop: 8,
    },
    heading: {
      fontSize: 16,
      lineHeight: HEADING_LINE_HEIGHT - 1,
      fontWeight: '700',
      color: 'black',
    },
    body: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: '600',
      color: 'black',
      textAlign: 'justify',
    },
  }),
};

const styles = StyleSheet.create({
  row: baseRow,
  markerBox: {
    width: 26,
    alignItems: 'flex-start',
  },
  textColumn: baseTextColumn,
});
