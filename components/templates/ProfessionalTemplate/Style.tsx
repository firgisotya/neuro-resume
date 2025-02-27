import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  contact: {
    fontSize: 11,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingBottom: 3,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  company: {
    fontSize: 12,
    fontWeight: "bold",
  },
  date: {
    fontSize: 11,
    marginBottom: 5,
  },
  duty: {
    fontSize: 11,
    marginBottom: 3,
    paddingLeft: 10,
  },
  dutyBullet: {
    width: "100%",
    flexDirection: "row",
  },
  bullet: {
    width: 10,
    fontSize: 11,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  skill: {
    marginRight: 5,
    marginBottom: 5,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
});

export default styles;
