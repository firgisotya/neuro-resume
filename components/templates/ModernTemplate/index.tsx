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

const ModernTemplate: FC<ResumeProps> = ({ data, isLoading }) => {
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
        {/* Header dengan informasi kontak */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData?.personalInfo?.fullName}</Text>
          <Text style={styles.title}>{resumeData?.personalInfo?.jobTitle}</Text>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text>{resumeData?.personalInfo?.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{resumeData?.personalInfo?.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{resumeData?.personalInfo?.linkedin}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{resumeData?.personalInfo?.github}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{resumeData?.personalInfo?.portfolio}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{resumeData?.personalInfo?.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.columnContainer}>
          {/* Kolom Kiri - Pengalaman dan Pendidikan */}
          <View style={styles.leftColumn}>
            {/* Ringkasan Profesional */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
              <Text style={styles.description}>{resumeData?.summary}</Text>
            </View>

            {/* Pengalaman Kerja */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCES</Text>

              {resumeData?.experiences?.map((experience, index) => (
                <View style={styles.experienceItem} key={index}>
                  <Text style={styles.jobTitle}>{experience?.title}</Text>
                  <Text style={styles.company}>{experience?.companyName}</Text>
                  <Text style={styles.date}>
                    {formatMonthYear(experience.startDate)} -{" "}
                    {experience.endDate
                      ? formatMonthYear(experience.endDate)
                      : "Present"}
                  </Text>
                  <Text style={styles.description}>
                    {parse(experience?.workSummary ?? "", {
                      replace: (domNode: any) => {
                        if (domNode.name === "li") {
                          return (
                            <Text style={styles.bullet}>
                              • {domNode.children[0].data}
                            </Text>
                          );
                        }
                        return null;
                      },
                    })}
                  </Text>
                </View>
              ))}
            </View>

            {/* Pendidikan */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATIONS</Text>

              {resumeData?.educations?.map((education, index) => (
                <View style={styles.education} key={index}>
                  <Text style={styles.degree}>
                    {education.degree} in {education.major}
                  </Text>
                  <Text style={styles.school}>{education.universityName}</Text>
                  <Text style={styles.date}>
                    {formatMonthYear(education.startDate)} -{" "}
                    {education.endDate
                      ? formatMonthYear(education.endDate)
                      : "Present"}
                  </Text>
                  <Text style={styles.description}>
                    {parse(education.description ?? "", {
                      replace: (domNode: any) => {
                        if (domNode.name === "li") {
                          return (
                            <Text style={styles.bullet}>
                              • {domNode.children[0].data}
                            </Text>
                          );
                        }
                        return null;
                      },
                    })}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Kolom Kanan - Keahlian dan Info Tambahan */}
          <View style={styles.rightColumn}>
            {/* Keahlian */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SKILL</Text>

              <View style={styles.skills}>
                {resumeData?.skill
                  ?.replace(/\s/g, "")
                  .split(",")
                  .map((skill, index) => (
                    <Text style={styles.skill} key={index}>
                      {skill}
                    </Text>
                  ))}
              </View>
            </View>

            {/* Sertifikasi */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CERTIFICATES</Text>

              {resumeData?.certificates?.map((certificate, index) => (
                <View style={styles.education}>
                <Text style={styles.degree}>{certificate.title}</Text>
                <Text style={styles.school}>{certificate.issuer}</Text>
                <Text style={styles.date}>{certificate.issueDate}</Text>
              </View>
              ))}
            </View>

            {/* Bahasa */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>

              {resumeData?.languages?.map((language, index) => (
                <Text style={styles.description}>{language.name} ({language.proficiency})</Text>
              ))}
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModernTemplate;
