import * as React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";

const PrivacyPolicy = () => {
  const colorScheme = useColorScheme();

  const container =
    colorScheme === "light" ? styles.light_container : styles.dark_container;
  const heading =
    colorScheme === "light" ? styles.light_heading : styles.dark_heading;
  const text = colorScheme === "light" ? styles.light_text : styles.dark_text;

  return (
    <ScrollView style={container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={heading}>Privacy Policy</Text>
      <Text style={text}>
        Edward Rees built the Simple Gratitude Journal app as an Open Source
        app. This SERVICE is provided by Edward Rees at no cost and is intended
        for use as is.
      </Text>
      <Text style={text}>
        This page is used to inform visitors regarding my policies with the
        collection, use, and disclosure of Personal Information if anyone
        decided to use my Service.
      </Text>
      <Text style={text}>
        If you choose to use my Service, then you agree to the collection and
        use of information in relation to this policy. The Personal Information
        that I collect is used for providing and improving the Service. I will
        not use or share your information with anyone except as described in
        this Privacy Policy.
      </Text>
      <Text style={text}>
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which is accessible at Simple Gratitude Journal
        unless otherwise defined in this Privacy Policy.
      </Text>

      <Text style={heading}>Information Collection and Use</Text>
      <Text style={text}>
        For a better experience, while using our Service, I may require you to
        provide us with certain personally identifiable information, including
        but not limited to none,. The information that I request will be
        retained on your device and is not collected by me in any way.
      </Text>
      <Text style={text}>
        The app does use third party services that may collect information used
        to identify you.
      </Text>
      <Text style={text}>
        Link to privacy policy of third party service providers used by the app
      </Text>
      <Text style={heading}>Google Play Services</Text>
      <Text style={heading}>Log Data</Text>
      <Text style={text}>
        I want to inform you that whenever you use my Service, in a case of an
        error in the app I collect data and information (through third party
        products) on your phone called Log Data. This Log Data may include
        information such as your device Internet Protocol (“IP”) address, device
        name, operating system version, the configuration of the app when
        utilizing my Service, the time and date of your use of the Service, and
        other statistics.
      </Text>

      <Text style={heading}>Cookies</Text>

      <Text style={text}>
        Cookies are files with a small amount of data that are commonly used as
        anonymous unique identifiers. These are sent to your browser from the
        websites that you visit and are stored on your device's internal memory.
      </Text>

      <Text style={text}>
        This Service does not use these “cookies” explicitly. However, the app
        may use third party code and libraries that use “cookies” to collect
        information and improve their services. You have the option to either
        accept or refuse these cookies and know when a cookie is being sent to
        your device. If you choose to refuse our cookies, you may not be able to
        use some portions of this Service.
      </Text>

      <Text style={heading}>Service Providers</Text>
      <Text style={text}>
        I may employ third-party companies and individuals due to the following
        reasons:
      </Text>

      <Text>To facilitate our Service;</Text>
      <Text>To provide the Service on our behalf;</Text>
      <Text>To perform Service-related services; or</Text>
      <Text>To assist us in analyzing how our Service is used.</Text>
      <Text style={text}>
        I want to inform users of this Service that these third parties have
        access to your Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </Text>

      <Text style={heading}>Security</Text>

      <Text style={text}>
        I value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and I cannot guarantee
        its absolute security.
      </Text>

      <Text style={heading}>Links to Other Sites</Text>
      <Text style={text}>
        This Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by me. Therefore, I strongly advise you
        to review the Privacy Policy of these websites. I have no control over
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </Text>

      <Text style={heading}>Children’s Privacy</Text>
      <Text style={text}>
        These Services do not address anyone under the age of 13. I do not
        knowingly collect personally identifiable information from children
        under 13. In the case I discover that a child under 13 has provided me
        with personal information, I immediately delete this from our servers.
        If you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact me so that I will
        be able to do necessary actions.
      </Text>

      <Text style={heading}>Changes to This Privacy Policy</Text>
      <Text style={text}>
        I may update our Privacy Policy from time to time. Thus, you are advised
        to review this page periodically for any changes. I will notify you of
        any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={text}>This policy is effective as of 2020-08-01</Text>

      <Text style={heading}>Contact Us</Text>

      <Text style={text}>
        If you have any questions or suggestions about my Privacy Policy, do not
        hesitate to contact me at Edward Rees.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  light_container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  dark_container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  light_heading: { fontSize: 18, fontWeight: "bold", color: "#000" },
  dark_heading: { fontSize: 18, fontWeight: "bold", color: "#f8f8f8" },
  light_text: { fontSize: 18, lineHeight: 20, color: "#000" },
  dark_text: { fontSize: 18, lineHeight: 20, color: "#f8f8f8" },
});

export { PrivacyPolicy };
