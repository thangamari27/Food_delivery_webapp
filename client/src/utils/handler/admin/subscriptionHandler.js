// Helper function to format messages
export const formatMessage = (template, data) => {
  return template.replace(/{(\w+)}/g, (match, key) => data[key] || match);
};