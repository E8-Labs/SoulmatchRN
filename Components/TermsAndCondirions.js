import React from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, Image } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import customFonts from "../assets/fonts/Fonts";

const { height, width } = Dimensions.get("window")

const TermsAndConditions = ({navigation}) => {

  return (
    <SafeAreaView>
      <View style={[GlobalStyles.container, { height: height * 0.9 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: width - 40, marginTop: 0 }}>
            <TouchableOpacity
              onPress={()=>{
                navigation.goBack()
              }}
            >
              <View style={GlobalStyles.backBtn}>
                <Image source={require('../assets/images/backArrow.png')}
                  style={GlobalStyles.backBtnImage}
                />
              </View>
            </TouchableOpacity>
            <Text style={[styles.title, { marginTop: 30 }]}>SoulMatch Terms and Conditions</Text>
            <Text style={styles.lastUpdated}>Last Updated: August 10, 2024</Text>

            <Text style={styles.section}>
              Welcome to SoulMatch, a service provided by Soulmatch (“Company,” “we,”
              “us,” or “our”). By using our website, mobile applications, or other
              related services (collectively, the “Service”), you agree to comply
              with and be bound by these Terms and Conditions (“Terms”). Please read
              them carefully before using our Service.
            </Text>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>1. Acceptance of Terms</Text>
              <Text style={styles.text}>
                By creating an account or using the Service, you agree to these Terms
                and our Privacy Policy. If you do not agree with these Terms, you
                must not use the Service.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>2. Eligibility</Text>
              <Text style={styles.text}>
                You must be at least 18 years old to use the Service. By accessing or
                using the Service, you represent and warrant that you are 18 years of
                age or older and have the legal capacity to enter into this
                agreement.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>3. Account Registration</Text>
              <Text style={styles.text}>
                To access certain features of the Service, you must create an account
                by providing accurate and complete information, including a valid
                email address and a secure password. You are responsible for
                maintaining the confidentiality of your login credentials and for all
                activities that occur under your account. You agree to notify us
                immediately at support@soulmatch.dating of any unauthorized use of
                your account or any other security breach.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>4. User Conduct</Text>
              <Text style={styles.text}>
                You agree to use the Service in compliance with all applicable laws
                and regulations. You further agree not to:
              </Text>
              <Text style={styles.bullet}>
                • Post or transmit any content that is harmful, abusive, defamatory,
                discriminatory, obscene, or otherwise objectionable.
              </Text>
              <Text style={styles.bullet}>
                • Engage in any form of harassment, stalking, or threatening
                behavior.
              </Text>
              <Text style={styles.bullet}>
                • Impersonate any individual or entity, or falsely represent your
                affiliation with any person or organization.
              </Text>
              <Text style={styles.bullet}>
                • Upload, distribute, or transmit any viruses, malware, or any other
                malicious code intended to disrupt or harm the Service or users.
              </Text>
              <Text style={styles.bullet}>
                • Use the Service for any commercial purposes or unauthorized
                advertising without our prior written consent.
              </Text>
              <Text style={styles.bullet}>
                • Collect or store personal data about other users without their
                express consent.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>5. Subscription and Payment Terms</Text>
              <Text style={styles.subTitle2}>
                5.1 Subscription Plans
              </Text>

              <Text style={styles.text}>

                SoulMatch offers several subscription plans, which include both free
                and paid options. Each plan provides different levels of access to
                features such as messaging, profile visibility, and match
                preferences. Detailed information regarding our subscription plans,
                including current pricing and features, can be found on our mobile
                app and website at www.soulmatch.dating.
              </Text>
              <Text style={styles.subTitle2}>
                5.2 Payment Terms
              </Text>
              <Text style={styles.text}>
                All payments for subscriptions must be made in advance using a valid
                credit card, debit card, or other payment method accepted by us. By
                subscribing to a paid plan, you authorize us to charge your payment
                method for the applicable subscription fees at the start of each
                billing cycle. Subscription fees are subject to change, and we will
                notify you in advance of any changes to pricing.
              </Text>
              <Text style={styles.subTitle2}>
                5.3 Auto-Renewal and Cancellation
              </Text>
              <Text style={styles.text}>

                Paid subscriptions automatically renew at the end of each billing
                period unless you cancel your subscription at least 30 days before
                the end of the current period. You can cancel your subscription
                through your account settings or by contacting customer support at
                support@soulmatch.dating.
              </Text>
              <Text style={styles.subTitle2}>
                5.4 Refund Policy
              </Text>
              <Text style={styles.text}>
                All subscription fees are non-refundable, except as required by law.
                In certain circumstances, such as billing errors, we may consider
                issuing refunds at our sole discretion. To request a refund, please
                contact us at support@soulmatch.dating within 7 days of the charge.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>6. Account Suspension and Termination</Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>6.1 Voluntary Account Deletion{"\n"}</Text>
                You may delete your account at any time by navigating to your account settings and selecting the delete option. Upon deletion, all of your personal information, matches, and interactions will be permanently removed from our system, and you will no longer have access to the Service.
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>6.2 Involuntary Account Termination{"\n"}</Text>
                We reserve the right to suspend or terminate your account at our sole discretion if we determine that you have violated these Terms, engaged in fraudulent or harmful behavior, or if your actions have negatively impacted the safety or experience of other users. We may also terminate your account if required to do so by law.{"\n"}
                In the event of termination, you will not be entitled to any refunds of unused subscription fees, and you may be permanently barred from using the Service.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>7. Intellectual Property Rights</Text>
              <Text style={styles.text}>
                All content and materials provided through the Service, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, software, and other intellectual property, are owned by or licensed to us and are protected by applicable copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, modify, or create derivative works from any content available through the Service without our express written permission.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>8. Privacy</Text>
              <Text style={styles.text}>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, share, and protect your personal information when you use the Service. By using the Service, you agree to the terms of our Privacy Policy.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>9. Disclaimers</Text>
              <Text style={styles.text}>
                The Service is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation of the Service, the accuracy or reliability of any content provided through the Service, or the suitability of the Service for your particular needs. We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>10. Limitation of Liability</Text>
              <Text style={styles.text}>
                To the fullest extent permitted by law, we will not be liable for any indirect, incidental, punitive, special, or consequential damages arising out of or in connection with your use of the Service, whether or not we have been advised of the possibility of such damages. Our total liability to you for any claims arising out of or related to these Terms or your use of the Service will not exceed the amount you have paid us, if any, during the six months preceding the claim.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>11. Governing Law</Text>
              <Text style={styles.text}>
                These Terms and any disputes arising out of or related to these Terms or the Service will be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located within Santa Clara County, California for the resolution of any disputes.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>12. Changes to the Terms</Text>
              <Text style={styles.text}>
                We may update these Terms from time to time to reflect changes in our practices, technology, or legal requirements. If we make significant changes to these Terms, we will notify you by posting a notice on our website or by sending you an email to the address associated with your account. Your continued use of the Service following any such changes constitutes your acceptance of the new Terms.
              </Text>
            </View>

            <View style={styles.subSection}>
              <Text style={styles.subTitle}>13. Contact Information</Text>
              <Text style={styles.text}>
                If you have any questions or concerns about these Terms or the Service, please contact us at support@soulmatch.dating.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,

    width: width - 40
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: customFonts.bold
  },
  lastUpdated: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  section: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'left',
  },
  subSection: {
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: customFonts.bold,
    marginBottom: 4,
  },
  subTitle2: {
    marginTop: 7,
    fontSize: 18,
    fontFamily: customFonts.semibold,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: customFonts.regular,
    textAlign: "left",
  },
  bullet: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 16,
    fontFamily: customFonts.regular,
    textAlign: "left",
  },
});

export default TermsAndConditions;
