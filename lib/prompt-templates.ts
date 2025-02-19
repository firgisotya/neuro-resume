const promptTemplates = {
  experience: `Given the job title "{jobTitle}", 
    create 6-7 concise and personal bullet points in HTML stringify format that highlight my key skills, relevant technologies, and significant contributions in that role. 
    Do not include the job title itself in the output. Provide only the bullet points inside an unordered list.`,

  education: `Generate a detailed educational background summary based on the degree "{degree}" and field of study "{fieldOfStudy}". 
    The response should be 2-3 sentences and highlight academic achievements, coursework, and relevant projects.
    create personal bullet points in HTML stringify format.
    Do not include the degree or field of study in the output. Provide only the bullet points inside an unordered list.`,

  summary: `Job Title: {jobTitle}. Based on the job title, please generate concise 
and complete summaries for my resume in JSON format, incorporating the following experience
levels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines,
reflecting a personal tone and showcasing specific relevant programming languages, technologies,
frameworks, and methodologies without any placeholders or gaps. Ensure that the summaries are
engaging and tailored to highlight unique strengths, aspirations, and contributions to collaborative
projects, demonstrating a clear understanding of the role and industry standards.`,

  project: `Given the project title "{projectTitle}", 
    create 2-3 concise and personal bullet points in HTML stringify format that highlight the project's key features, technologies used, and your contributions.
    Do not include the project title itself in the output. Provide only the bullet points inside an unordered list.`,
};

/**
 * Replace placeholders in prompt templates
 * @param {string} key - The prompt key (experience, education, summary, project)
 * @param {Record<string, string>} values - Object containing dynamic values
 * @returns {string} - The final prompt with values replaced
 */
export const getPrompt = (
  key: keyof typeof promptTemplates,
  values: Record<string, string>
): string => {
  let template = promptTemplates[key];
  for (const [placeholder, value] of Object.entries(values)) {
    template = template.replace(`{${placeholder}}`, value);
  }
  return template;
};

export default promptTemplates;
