import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';

export const MATERIAL_OPTIONS = [
  '10% of 24K Gold',
  '10% of 22K Gold',
  '10% of 18K Gold',
  '10% 999 Silver',
  'Rose Gold',
  'Pearl',
  'Stone',
  'Diamond',
];

export default function FilterModal({ visible, materials, minPrice, maxPrice, onApply, onClose }) {
  const [selectedMaterials, setSelectedMaterials] = useState(materials || []);
  const [min, setMin] = useState(minPrice ? String(minPrice) : '');
  const [max, setMax] = useState(maxPrice ? String(maxPrice) : '');

  useEffect(() => {
    if (visible) {
      setSelectedMaterials(materials || []);
      setMin(minPrice ? String(minPrice) : '');
      setMax(maxPrice ? String(maxPrice) : '');
    }
  }, [visible]);

  const toggleMaterial = (m) => {
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const handleReset = () => {
    setSelectedMaterials([]);
    setMin('');
    setMax('');
  };

  const handleApply = () => {
    onApply({
      materials: selectedMaterials,
      minPrice: min ? Number(min) : null,
      maxPrice: max ? Number(max) : null,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.sheet} onStartShouldSetResponder={() => true}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>Price Range</Text>
            <View style={styles.priceRow}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                keyboardType="numeric"
                value={min}
                onChangeText={setMin}
              />
              <Text style={{ marginHorizontal: 8, color: '#999' }}>to</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                keyboardType="numeric"
                value={max}
                onChangeText={setMax}
              />
            </View>

            <Text style={styles.sectionLabel}>Material</Text>
            <View style={styles.chipsWrap}>
              {MATERIAL_OPTIONS.map((m) => {
                const active = selectedMaterials.includes(m);
                return (
                  <TouchableOpacity
                    key={m}
                    style={[styles.materialChip, active && styles.materialChipActive]}
                    onPress={() => toggleMaterial(m)}
                  >
                    <Text style={[styles.materialChipText, active && styles.materialChipTextActive]}>{m}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#00000060', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 17, fontWeight: '700', color: '#222' },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#333', marginTop: 12, marginBottom: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  priceInput: { flex: 1, borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: '#222' },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  materialChip: { borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, marginRight: 8, marginBottom: 8 },
  materialChipActive: { backgroundColor: Colors.theme1, borderColor: Colors.theme1 },
  materialChipText: { fontSize: 13, color: '#444' },
  materialChipTextActive: { color: '#fff', fontWeight: '600' },
  actionsRow: { flexDirection: 'row', marginTop: 16, gap: 12 },
  resetBtn: { flex: 1, borderWidth: 1.5, borderColor: '#222', borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  resetText: { fontSize: 15, fontWeight: '600', color: '#222' },
  applyBtn: { flex: 1, backgroundColor: Colors.theme1, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  applyText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
