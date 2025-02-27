"use client";
import { FC } from "react";
import parse from "html-react-parser";
import { Page, Text, View, Document, Link } from "@react-pdf/renderer";
import styles from "./Style";
import { ResumeDataType } from "@/types/resume.type";
import dummyData from "@/mock/dummyData";
import { formatMonthYear } from "@/lib/utils";
import { Loader } from "lucide-react";

interface ResumeProps {
  data: ResumeDataType | undefined;
  isLoading: boolean;
}

const ProfessionalTemplate: FC<ResumeProps> = ({ data, isLoading }) => {
  let resumeData = null;
  if (!data?.personalInfo) {
    resumeData = dummyData;
  } else {
    resumeData = data;
  }

  if (isLoading) {
    return <Loader size="48px" className="animate-spin" />;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData?.personalInfo?.fullName}</Text>
          <Text style={styles.title}>{resumeData?.personalInfo?.jobTitle}</Text>
          <Text style={styles.contact}>
            Email: {resumeData?.personalInfo?.email} | Phone:{" "}
            {resumeData?.personalInfo?.phone} | Address:{" "}
            {resumeData?.personalInfo?.address}
          </Text>
          <Text style={styles.contact}>
            LinkedIn: {resumeData?.personalInfo?.linkedin} | Website:{" "}
            {resumeData?.personalInfo?.portfolio}
          </Text>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <Text>{resumeData?.summary}</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCES</Text>

          {resumeData?.experiences?.map((exp, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.flexRow}>
                <Text style={styles.experienceTitle}>{exp.title}</Text>
                <Text style={styles.date}>
                  {formatMonthYear(exp.startDate)} -{" "}
                  {exp.endDate ? formatMonthYear(exp.endDate) : "Present"}
                </Text>
              </View>
              <Text style={styles.company}>
                {exp.companyName}, {exp.city}
              </Text>

              {parse(exp.workSummary ?? "", {
                replace: (domNode: any) => {
                  if (domNode.name === "li") {
                    return (
                      <View style={styles.dutyBullet}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.duty}>
                          {domNode.children[0].data}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                },
              })}
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATIONS</Text>
          {resumeData?.educations?.map((edu, index) => (
            <View key={index}>
              <View style={styles.flexRow}>
                <Text style={styles.experienceTitle}>
                  {edu.degree}, {edu.major}
                </Text>
                <Text style={styles.date}>
                  {formatMonthYear(edu.startDate)} -{" "}
                  {edu.endDate ? formatMonthYear(edu.endDate) : "Present"}
                </Text>
              </View>
              <Text style={styles.company}>{edu.universityName}</Text>
              {parse(edu.description ?? "", {
                replace: (domNode: any) => {
                  if (domNode.name === "li") {
                    return (
                      <View style={styles.dutyBullet}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.duty}>
                          {domNode.children[0].data}
                        </Text>
                      </View>
                    );
                  } else {
                    return null;
                  }
                },
              })}
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILL</Text>
          <Text style={styles.skill}>{resumeData?.skill}</Text>
        </View>

        {/* Certifications Section (Optional) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          {resumeData?.certificates?.map((cert, index) => (
            <View key={index}>
              <View style={styles.dutyBullet}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.duty}>
                  {cert.title}, {cert.issuer}, {formatMonthYear(cert.issueDate)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalTemplate;
