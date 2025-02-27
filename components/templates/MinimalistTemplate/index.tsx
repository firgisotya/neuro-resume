"use client";
import { FC } from "react";
import parse from "html-react-parser";
import { Page, Text, View, Document, Link } from "@react-pdf/renderer";
import Section from "./Section";
import ListItem from "./ListItem";
import styles from "./Style";
import { ResumeDataType } from "@/types/resume.type";
import dummyData from "@/mock/dummyData";
import { formatMonthYear } from "@/lib/utils";
import { Loader } from "lucide-react";

interface HeaderProps {
  data: ResumeDataType["personalInfo"] | undefined;
}

interface EducationProps {
  data: ResumeDataType["educations"] | undefined;
}

interface ProjectProps {
  data: ResumeDataType["projects"] | undefined;
}

interface ExperienceProps {
  data: ResumeDataType["experiences"] | undefined;
}

interface SkillsProps {
  data: ResumeDataType | undefined;
}

interface CertificatesProps {
  data: ResumeDataType["certificates"] | undefined;
}

interface LanguagesProps {
  data: ResumeDataType["languages"] | undefined;
}

interface ResumeProps {
  data: ResumeDataType | undefined;
  isLoading: boolean;
}

const parseListHtml = (htmlString: any) => {
    if (!htmlString) return null;
    return parse(htmlString, {
        replace: (domNode: any) => {
          if (domNode.name === "ul") {
            return <View style={styles.lists}>{domNode.children.map(parseListHtml)}</View>;
          }
          if (domNode.name === "li") {
            return <Text style={styles.listItem}>• {domNode.children[0].data}</Text>;
          }
        },
      });
}

const Header: FC<HeaderProps> = ({ data }) => {
  return (
    <Section>
      <Text style={styles.header__name}>{data?.fullName}</Text>
      <View style={styles.header__links}>
        <Link
          key={data?.phone}
          src={data?.phone || ""}
          style={{ color: "#555" }}
        >
          {data?.phone}
        </Link>
        <Link
          key={data?.email}
          src={data?.email || ""}
          style={{ color: "#555" }}
        >
          {data?.email}
        </Link>
        <Link
          key={data?.linkedin}
          src={data?.linkedin || ""}
          style={{ color: "#555" }}
        >
          {data?.linkedin}
        </Link>
        <Link
          key={data?.github}
          src={data?.github || ""}
          style={{ color: "#555" }}
        >
          {data?.github}
        </Link>
        <Link
          key={data?.portfolio}
          src={data?.portfolio || ""}
          style={{ color: "#555" }}
        >
          {data?.portfolio}
        </Link>
      </View>
    </Section>
  );
};

const Education: FC<EducationProps> = ({ data }) => (
  <Section title={"Education"}>
    {data?.map(
      (
        { universityName, degree, major, startDate, endDate, description },
        i
      ) => (
        <View key={i}>
          <View style={styles.title_wrapper}>
            <Text style={styles.title}>
              {degree} in {major}
            </Text>
            <Text style={styles.date}>
              {formatMonthYear(startDate)}- {formatMonthYear(endDate)}
            </Text>
          </View>

          <View style={styles.subTitle_wrapper}>
            <Text>{universityName}</Text>
          </View>

          <View style={styles.lists}>
            {parse(description ?? "", {
              replace: (domNode: any) => {
                if (domNode.name === "li") {
                  return <ListItem>{domNode.children[0].data}</ListItem>;
                }
                return null;
              },
            })}
          </View>

          {i !== data.length - 1 && <View style={styles.line} />}
        </View>
      )
    )}
  </Section>
);

const Projects: FC<ProjectProps> = ({ data }) => (
  <Section title={"Projects"}>
    {data?.map((project, i) => (
      <View key={i}>
        <View style={styles.title_wrapper}>
          <Text style={styles.title}>{project.title}</Text>
          {/* <Text style={styles.date}>
                        ({project.start} - {project.end})
                    </Text> */}
        </View>

        <View style={styles.subTitle_wrapper}>
          <Link
            style={{
              textDecoration: "none",
              color: "#666",
            }}
            src={project.link || ""}
          >
            {project.link}
          </Link>
        </View>

        <View style={styles.lists}>
            {parse(project.description ?? "", {
              replace: (domNode: any) => {
                if (domNode.name === "li") {
                  return <ListItem>{domNode.children[0].data}</ListItem>;
                }
                return null;
              },
            })}
          </View>

        {i !== data.length - 1 && <View style={styles.line} />}
      </View>
    ))}
  </Section>
);

const Experience: FC<ExperienceProps> = ({ data }) => (
  <Section title={"Experience"}>
    {data?.map(
      (
        { title, companyName, city, state, startDate, endDate, workSummary },
        i
      ) => (
        <View key={i}>
          <View style={styles.title_wrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>
              {formatMonthYear(startDate)} - {formatMonthYear(endDate)}
            </Text>
          </View>

          <View style={styles.subTitle_wrapper}>
            <Text>{companyName}</Text>
            <Text>
              {city} {state}
            </Text>
          </View>

          {/* Parsing workSummary yang mengandung HTML */}
          <View style={styles.lists}>
            {parse(workSummary ?? "", {
              replace: (domNode: any) => {
                if (domNode.name === "li") {
                  return <ListItem>{domNode.children[0].data}</ListItem>;
                }
                return null;
              },
            })}
          </View>
          
          {i !== data.length - 1 && <View style={styles.line} />}
        </View>
      )
    )}
  </Section>
);

const Certificaes: FC<CertificatesProps> = ({ data }) => (
  <Section title={"Certifications"}>
    {data?.map(({ title, issuer, issueDate }, i) => (
      <View key={i}>
        <View style={styles.title_wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{formatMonthYear(issueDate)}</Text>
        </View>

        <View style={styles.subTitle_wrapper}>
          <Text>{issuer}</Text>
        </View>

        {i !== data.length - 1 && <View style={styles.line} />}
      </View>
    ))}
  </Section>
);

const Languages: FC<LanguagesProps> = ({ data }) => (
  <Section title={"Languages"}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {data?.map(({ name, proficiency }, i) => (
        <View key={i}>
          <Text style={{ fontSize: 12 }}>{name}</Text>
          <Text style={{ fontSize: 10, color: "#777" }}>{proficiency}</Text>
        </View>
      ))}
    </View>
  </Section>
);



const MinimalistTemplate: FC<ResumeProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return <Loader size="48px" className="animate-spin" />
      }
      let resumeData = null;
    if (!data?.personalInfo){
      resumeData = dummyData;
    } else {
      resumeData = data;
    }

  return (
    <Document language="en">
      <Page size="A4" style={styles.page}>
        <Header data={resumeData?.personalInfo} />

        {resumeData?.summary && (
          <Section title={"Summary"}>
            <Text style={{ fontSize: 10 }}>{resumeData?.summary}</Text>
          </Section>
        )}

        {resumeData?.educations && <Education data={resumeData?.educations} />}
        {resumeData?.experiences && <Experience data={resumeData?.experiences} />}
        {resumeData?.projects && <Projects data={resumeData?.projects} />}

        <Section title={"skills"}>
          <Text style={{ fontSize: 11 }}>{resumeData?.skill}</Text>
        </Section>
        {resumeData?.certificates && <Certificaes data={resumeData?.certificates} />}
        {resumeData?.languages && <Languages data={resumeData?.languages} />}
      </Page>
    </Document>
  );
};

export default MinimalistTemplate;
