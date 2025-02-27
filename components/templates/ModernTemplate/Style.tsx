import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      padding: 30,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: 10,
    },
    header: {
      marginBottom: 20,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#1A237E',
    },
    title: {
      fontSize: 14,
      marginBottom: 10,
      color: '#455A64',
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      fontSize: 10,
      marginBottom: 5,
    },
    contactItem: {
      marginRight: 15,
      marginBottom: 3,
    },
    link: {
      color: '#1A237E',
      textDecoration: 'none',
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 6,
      backgroundColor: '#F5F5F5',
      padding: 5,
      color: '#1A237E',
    },
    experienceItem: {
      marginBottom: 10,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    company: {
      fontSize: 11,
      marginBottom: 2,
    },
    date: {
      fontSize: 10,
      color: '#455A64',
      marginBottom: 4,
    },
    description: {
      fontSize: 10,
      marginBottom: 2,
      lineHeight: 1.4,
    },
    bullet: {
      marginLeft: 10,
    },
    skills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skill: {
      fontSize: 10,
      backgroundColor: '#E3F2FD',
      padding: '3 6',
      borderRadius: 3,
      marginRight: 5,
      marginBottom: 5,
      color: '#1A237E',
    },
    education: {
      marginBottom: 8,
    },
    degree: {
      fontSize: 11,
      fontWeight: 'bold',
    },
    school: {
      fontSize: 10,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      color: '#78909C',
      fontSize: 8,
    },
    columnContainer: {
      flexDirection: 'row',
    },
    leftColumn: {
      width: '65%',
      paddingRight: 10,
    },
    rightColumn: {
      width: '35%',
    },
  });

export default styles;
