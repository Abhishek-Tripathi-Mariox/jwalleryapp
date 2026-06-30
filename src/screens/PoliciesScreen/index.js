import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../components/Header/BackHeader';

const THEME = '#930e6e';

// ── Content blocks ──────────────────────────────────────────
const BUY_BACK = {
  title: '1. 5-Year Assured Buy Back Policy',
  intro: 'At Swarnaz, we believe every purchase should be a smart investment.',
  bullets: [
    'You can exchange or sell back your Smart Gold Jewellery under our Buy Back Policy.',
    'Within 3 to 5 days of purchase, returns/exchanges are accepted as per our store guidelines (unused condition and original invoice required).',
    'After the initial return period, the jewellery will be eligible for 50% Assured Buy Back as per the prevailing company policy.',
    'After 5 years, the buy back value will be calculated according to the gold purity and the applicable company policy at that time.',
  ],
};
const PRODUCT_CARE = {
  title: '2. Product Care & Service',
  intro: 'Your jewellery deserves proper care. From the date of purchase, if within 6 months you experience:',
  bullets: ['Colour fading', 'Loss of shine', 'Surface dullness'],
  outro: 'Swarnaz will provide FREE polishing and cleaning service without altering the original design of the jewellery.',
};
const GOLD_PURITY = {
  title: '3. Gold Purity',
  intro: 'Swarnaz Smart Gold Jewellery is crafted using 24K Gold with 10% Gold Purity, offering:',
  bullets: ['Premium Luxury Finish', 'Modern & Trendy Designs', 'Lightweight Comfort', 'Affordable Pricing', 'Long-Lasting Appearance'],
};
const WARRANTY = {
  title: '4. 5-Year Product Warranty',
  intro: 'Every Swarnaz Smart Gold Jewellery comes with a 5-Year Warranty. If any manufacturing-related issue arises during the warranty period, Swarnaz will inspect the product and provide an appropriate solution as per the company’s warranty and buy back policy.',
  bullets: [],
};

const TERMS = [
  'Original Purchase Invoice is mandatory for all warranty, service and buy back claims.',
  'Warranty covers manufacturing defects only.',
  'Damage caused due to misuse, accidents, chemicals, perfume, water exposure or improper handling is not covered under warranty.',
  'Normal wear and tear is not considered a manufacturing defect.',
  'Free polishing service is available only within the eligible service period.',
  'Buy Back value will be calculated according to the company’s prevailing policy and product condition.',
  'Products purchased under promotional offers may have different exchange or buy back conditions.',
  'Swarnaz reserves the right to modify the Buy Back Policy, Warranty and Terms & Conditions without prior notice.',
  'All disputes shall be subject to the jurisdiction of Patna, Bihar.',
];

const PRIVACY = [
  {
    title: 'Information We Collect',
    bullets: [
      'Only what is needed to serve you — name, mobile number, email and delivery address.',
      'Order, cart and wishlist activity to personalise your experience.',
    ],
  },
  {
    title: 'How We Protect You',
    bullets: [
      'Login is secured with OTP verification — no passwords to leak.',
      'Payments are processed securely via Razorpay. We never store your card, UPI or bank details.',
      'All data is transmitted over encrypted (HTTPS) connections.',
    ],
  },
  {
    title: 'How We Use Your Data',
    bullets: [
      'To process and deliver your orders and send order updates.',
      'To improve our products, offers and app experience.',
      'We never sell your personal data, and never share it for third-party marketing without your consent.',
    ],
  },
  {
    title: 'Your Rights',
    bullets: [
      'You can view or update your details anytime from Profile.',
      'You can request deletion of your account and data by contacting Swarnaz support.',
    ],
  },
];

const Section = ({ s }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{s.title}</Text>
    {s.intro ? <Text style={styles.para}>{s.intro}</Text> : null}
    {(s.bullets || []).map((b, i) => (
      <View key={i} style={styles.bulletRow}>
        <Text style={styles.bulletDot}>{'•'}</Text>
        <Text style={styles.bulletText}>{b}</Text>
      </View>
    ))}
    {s.outro ? <Text style={[styles.para, { marginTop: 8 }]}>{s.outro}</Text> : null}
  </View>
);

export default function PoliciesScreen({ navigation, route }) {
  const type = route?.params?.type || 'all';
  const title = route?.params?.title || 'Policies';

  let heading = 'Swarnaz Smart Gold Jewellery Policies';
  let sections = [];
  let terms = null;
  let privacy = null;

  if (type === 'return') {
    heading = 'Return & Buy Back Policy';
    sections = [BUY_BACK, PRODUCT_CARE];
  } else if (type === 'terms') {
    heading = 'Terms & Conditions';
    sections = [GOLD_PURITY, WARRANTY];
    terms = TERMS;
  } else if (type === 'security') {
    heading = 'Security & Privacy';
    privacy = PRIVACY;
  } else {
    sections = [BUY_BACK, PRODUCT_CARE, GOLD_PURITY, WARRANTY];
    terms = TERMS;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <BackHeader navigation={navigation} title={title} />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{heading}</Text>

        {sections.map((s) => <Section key={s.title} s={s} />)}

        {privacy && privacy.map((s) => <Section key={s.title} s={s} />)}

        {terms && (
          <View style={styles.section}>
            <Text style={styles.termsHead}>Terms &amp; Conditions</Text>
            {terms.map((t, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>{i + 1}.</Text>
                <Text style={styles.bulletText}>{t}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: '800', color: '#222', marginBottom: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: THEME, marginBottom: 8 },
  termsHead: { fontSize: 18, fontWeight: '800', color: '#222', marginBottom: 10 },
  para: { fontSize: 14, color: '#444', lineHeight: 21 },
  bulletRow: { flexDirection: 'row', marginTop: 6 },
  bulletDot: { fontSize: 14, color: THEME, marginRight: 8, fontWeight: '700', minWidth: 16 },
  bulletText: { flex: 1, fontSize: 14, color: '#444', lineHeight: 21 },
});
